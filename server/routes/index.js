/*jshint esversion: 6 */

module.exports = (app) => {

  const glob = require("glob");
  const path = require("path");
  const express = require('express');
  const router = express.Router();
  const request = require("request");
  const cheerio = require("cheerio");
  const fs = require("fs");
  const chokidar = require("chokidar");

  const srcFolder = path.resolve(`${__dirname}/../../src`);
  const injectedStyleId = '__devServerInjectedCSS';

  // adapted from https://github.com/tapio/live-server/blob/master/injected.html
  const injectedHTML = (files) => `
  <script type="text/javascript">
    if ('WebSocket' in window) {
      (function() {
        var files = ${JSON.stringify(files)};
        var fileMatches = function (json) {
          return json.file && (files.indexOf(json.file) !== -1);
        };
        var restyle = function (css) {
          document.getElementById('${injectedStyleId}').innerHTML = css;
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function(msg) {
          var json = JSON.parse(msg.data);
          switch (json.action) {
            case 'reload': fileMatches(json) && window.location.reload(); break;
            case 'restyle': fileMatches(json) && restyle(json.css); break;
          }
        };
      })();
    }
  </script>
  `;

  const handleWatchChange = (changePath) => {
    const broadcast = (json) => {
      json.file = changePath;
      const message = JSON.stringify(json);
      app.get('clients').forEach((client) => {
        client.send(message);
      });
    };

    if (path.extname(changePath) === ".css") {
      fs.readFile(changePath, 'utf8', (err, css) => {
        broadcast({
          action: 'restyle',
          css: css || ""
        });
      });
    }
    else {
      broadcast({
        action: 'reload'
      });
    }
  };

  const watcher = chokidar.watch(`${srcFolder}/**/*`, {
    persistent: true,
    ignoreInitial: true
  });
  watcher
    .on("change", handleWatchChange)
    .on("add", handleWatchChange)
    .on("unlink", handleWatchChange)
    .on("addDir", handleWatchChange)
    .on("unlinkDir", handleWatchChange);

  router.get('/', (req, res, next) => {
    glob(`${srcFolder}/**/*.html`, (err, files) => {
      files = files.map((file) => file.substr(srcFolder.length)).sort();
      res.render('index', {
      title: 'Concord Portal Pages Development Server',
      files: files
      });
    });
  });

  router.get('/proxy', (req, res, next) => {
    const {file, portal, selector} = req.query;
    const fileParser = file.match(/\/([^/]+)\/(.+)/);
    const portalParser = portal.match(/^((https?):\/\/([^/]+)\/?)/);
    const port = req.socket.address().port;

    if (!fileParser || !portalParser) {
      return res.die("Invalid file or portal parameter!");
    }

    const [_, fileDomain, filePath] = fileParser;
    const [__, portalRoot, portalProtocol, portalDomain] = portalParser;

    const htmlPath = path.resolve(`${srcFolder}/${file}`);
    const cssPath = path.resolve(`${srcFolder}/${file.replace(/\.html$/, ".css")}`);

    const convertAPIUrlsToProxy = (html) => {
      return html.replace(/((['"])\/api\/)/g, (_, api, quote) => {
        return `${quote}http://localhost:${port}/api-proxy/${portalProtocol}/${portalDomain}/`;
      });
    };

    fs.readFile(htmlPath, 'utf8', (err, localHTML) => {
      fs.readFile(cssPath, 'utf8', (err, localCSS) => {
        if (err) { return res.die("Unable to read local html file!"); }

        const url = path.basename(filePath) !== "index.html" ? `${portal}/${filePath}` : portal;
        request.get(url, (err, response, portalHTML) => {
          if (err) { return res.die(err); }

          localHTML = convertAPIUrlsToProxy(localHTML);
          portalHTML = convertAPIUrlsToProxy(portalHTML);

          const $ = cheerio.load(portalHTML);
          $("head").prepend(`<base href="${portalRoot}">`);
          $(selector).html(`\n<style id="${injectedStyleId}">\n${localCSS || ""}</style>\n${localHTML}\n${injectedHTML([htmlPath, cssPath])}`);

          res.send($.html());
        });
      });
    });
  });

  router.get(/^\/api-proxy\/(.+)$/, (req, res, next) => {
    const [protocol, domain, ...rest] = req.params[0].split("/");
    if (!protocol || !domain || !rest) {
      return res.die("Invalid api-proxy url!");
    }
    const url = `${protocol}://${domain}/api/${rest.join("/")}`;
    request.get(url, (err, response, result) => {
      if (err) {
        res.die(err);
      }
      else {
        res.send(result);
      }
    });
  });

  return router;
};

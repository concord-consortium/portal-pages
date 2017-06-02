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
  const mkdirp = require("mkdirp");
  const stream = require("stream");

  const srcFolder = path.resolve(`${__dirname}/../../src`);
  const mockFolder = path.resolve(`${__dirname}/../../mock-ajax`);

  const injectedStyleId = '__devServerInjectedCSS';

  // adapted from https://github.com/tapio/live-server/blob/master/injected.html
  const createInjectedHTML = (files, mock, proxy) => {
    return `
      <!-- injected by development server -->
      <script type="text/javascript">

        // add live server reload and restyle
        if ('WebSocket' in window) {
          (function() {
            var fileMatches = function (json) {
              return json.file && (${JSON.stringify(files)}.indexOf(json.file) !== -1);
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

        // proxy all ajax requests
        (function () {
          var proxy = ${JSON.stringify(proxy)};
          var type = '${mock ? 'mock' : 'proxy'}';
          (function(open) {
            XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
              var proxyURL = url;
              if (url[0] === '/') {
                proxyURL = ['http://localhost:', proxy.port, '/ajax-proxy/', type, '/', proxy.protocol, '/', proxy.domain, url].join("");
              }
              return open.call(this, method, proxyURL, async, user, pass);
            };
          })(XMLHttpRequest.prototype.open);
        })();
      </script>
    `;
  };

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
    const {file, portal, selector, mock} = req.query;
    const fileParser = file.match(/\/([^/]+)\/(.+)/);
    const portalParser = portal.match(/^((https?):\/\/([^/]+)\/?)/);

    if (!fileParser || !portalParser) {
      return res.die("Invalid file or portal parameter!");
    }

    const [_, fileDomain, filePath] = fileParser;
    const [__, portalRoot, portalProtocol, portalDomain] = portalParser;

    const htmlPath = path.resolve(`${srcFolder}/${file}`);
    const cssPath = path.resolve(`${srcFolder}/${file.replace(/\.html$/, ".css")}`);

    fs.readFile(htmlPath, 'utf8', (err, localHTML) => {
      fs.readFile(cssPath, 'utf8', (err, localCSS) => {
        if (err) { return res.die("Unable to read local html file!"); }

        const portalURL = path.basename(filePath) !== "index.html" ? `${portal}/${filePath}` : portal;
        request.get(portalURL, (err, response, portalHTML) => {
          if (err) { return res.die(err); }

          const injectedHTML = createInjectedHTML([htmlPath, cssPath], !!mock, {
            port: app.get('port'),
            protocol: portalProtocol,
            domain: portalDomain
          });

          const $ = cheerio.load(portalHTML);
          $("head").prepend(`<base href="${portalRoot}">`);
          $(selector).html(`\n${injectedHTML}\n<!-- ${cssPath} -->\n<style id="${injectedStyleId}">\n${localCSS || ""}</style>\n<!-- ${htmlPath} -->\n${localHTML}\n`);

          res.send($.html());
        });
      });
    });
  });

  router.all(/^\/ajax-proxy\/(.+)$/, (req, res, next) => {
    const [type, protocol, domain, ...rest] = req.params[0].split("/");
    if (!protocol || !domain) {
      return res.die(`Invalid ajax-proxy url: ${req.params[0]}`);
    }

    const [beforeQuery, ...afterQuery] = req.url.split('?');
    const query = afterQuery.join("?");
    const proxyPath = rest.join("/");
    const proxyQuery = query.length > 0 ? `?${query}` : '';
    const proxyURL = `${protocol}://${domain}/${proxyPath}${proxyQuery}`;
    const method = req.method.toLowerCase();
    const mockQuery = query.length > 0 ? `-${(new Buffer(query)).toString('base64')}` : '';
    const mockPath = path.resolve(`${mockFolder}/${domain}/${proxyPath}${mockQuery}--${method}.json`);

    const proxyRequest = () => {
      if (app.get('argv').recordAjax) {
        mkdirp(path.dirname(mockPath), () => {
          const mockStream = fs.createWriteStream(mockPath);
          const pipe = req.pipe(request[method](proxyURL));
          const chunks = [];

          pipe.on('data', (chunk) => {
            res.write(chunk);
            chunks.push(chunk.toString());
          });
          pipe.on('end', () => {
            res.end();
            try {
              mockStream.write(JSON.stringify(JSON.parse(chunks.join("")), null, 2));
            }
            catch (e) {
              mockStream.write(chunks.join(""), null, 2);
            }
            mockStream.end();
          });
        });
      }
      else {
        req.pipe(request[method](proxyURL)).pipe(res);
      }
    };

    if (type === 'mock') {
      fs.readFile(mockPath, 'utf8', (err, json) => {
        if (err) {
          // fall back to proxy if mock doesn't exist
          proxyRequest();
        }
        else {
          res.send(json);
        }
      });
    }
    else {
      proxyRequest();
    }
  });

  return router;
};

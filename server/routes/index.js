/*jshint esversion: 6 */

const glob = require("glob");
const path = require("path");
const express = require('express');
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const srcFolder = path.resolve(`${__dirname}/../../src`);

const loadCSS = (file, callback) => {

};

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
        $(selector).html(`\n<style>\n${localCSS || ""}</style>\n${localHTML}`);

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

router.get('/css-for-file', (req, res, next) => {
  const file = req.query.file;
  if (!file) {
    return res.die("Missing file parameter!");
  }
  const cssFile = file.replace(/\.html$/, ".css");

  fs.readFile(cssPath, 'utf8', (err, css) => {
    res.send(css || "");
  });
});

module.exports = router;

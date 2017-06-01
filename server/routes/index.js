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
  const portalParser = portal.match(/^(https?:\/\/[^/]+\/?)/);

  if (!fileParser || !portalParser) {
    return res.die("Invalid file or portal parameter!");
  }

  const htmlPath = path.resolve(`${srcFolder}/${file}`);
  const cssPath = path.resolve(`${srcFolder}/${file.replace(/\.html$/, ".css")}`);

  fs.readFile(htmlPath, 'utf8', (err, localHTML) => {
    fs.readFile(cssPath, 'utf8', (err, localCSS) => {
      if (err) { return res.die("Unable to read local html file!"); }

      const [_, fileDomain, filePath] = fileParser;
      const url = path.basename(filePath) !== "index.html" ? `${portal}/${filePath}` : portal;

      request.get(url, (err, response, portalHTML) => {
        if (err) { return res.die(err); }

        const $ = cheerio.load(portalHTML);
        $("head").prepend(`<base href="${portalParser[1]}">`);
        $(selector).html(`\n<style>\n${localCSS || ""}</style>\n${localHTML}`);

        res.send($.html());
      });
    });
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

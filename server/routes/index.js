/*jshint esversion: 6 */

const glob = require("glob");
const path = require("path");
const express = require('express');
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

const srcFolder = path.resolve(`${__dirname}/../../src`);

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
  const [_, fileDomain, filePath] = fileParser;
  const url = filePath !== "index.html" ? `${portal}/${filePath}` : portal;

  request.get(url, (err, response, portalHTML) => {
    if (err) {
      return res.die(err);
    }

    const $ = cheerio.load(portalHTML);
    $("head").prepend(`<base href="${portalParser[1]}">`);

    res.send($.html());
  });
});

module.exports = router;

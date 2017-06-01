/*jshint esversion: 6 */

const glob = require("glob");
const path = require("path");
const express = require('express');
const router = express.Router();
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
  res.send('proxy...');
});

module.exports = router;

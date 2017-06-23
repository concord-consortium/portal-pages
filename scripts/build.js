// builds the static files in /dest from /src

/*jshint esversion: 6 */

const glob = require("glob");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const sass = require('node-sass');
const webpack = require("webpack");
var ncp = require('ncp').ncp;

const portalSrcFolder = path.resolve(`${__dirname}/../src/portals`);
const portalDestFolder = path.resolve(`${__dirname}/../dest/portals`);
const librarySrcFolder = path.resolve(`${__dirname}/../src/library`);
const libraryDestFolder = path.resolve(`${__dirname}/../dest/library`);
const assetsSrcFolder = path.resolve(`${__dirname}/../src/library/assets`);
const assetsDestFolder = path.resolve(`${__dirname}/../dest/library/assets`);

const die = (err, code) => {
  console.error(err);
  process.exit(1);
};

const fileContents = (filePath, tag) => {
  let contents = "";
  if (tag === "style") {
    try {
      result = sass.renderSync({file: filePath});
      contents = result.css || "";
    }
    catch (e) {}
  }
  else {
    try {
      contents = fs.readFileSync(filePath, "utf8");
    }
    catch (e) {}
  }
  return contents && tag ? `<${tag}>\n${contents}\n</${tag}>` : contents;
};

// get a list of all the .html files in src
glob(`${portalSrcFolder}/**/*.html`, (err, files) => {
  if (err) {
    die(err, 1);
  }

  const buildComment = `<!-- built using portal pages build script on ${new Date()} -->`;

  // iterate over the list creating the concatenated css and html in dest
  files.forEach((htmlInputFile) => {
    const bareInputFile = `${path.dirname(htmlInputFile)}/${path.basename(htmlInputFile, ".html")}`;
    const htmlOutputFile = path.resolve(`${portalDestFolder}/${htmlInputFile.substr(portalSrcFolder.length)}`);

    const html = fileContents(htmlInputFile);
    const css = fileContents(`${bareInputFile}.scss`, "style");
    const js = fileContents(`${bareInputFile}.js`, "script");

    mkdirp.sync(path.dirname(htmlOutputFile));

    fs.writeFileSync(htmlOutputFile, `${buildComment}\n${css}\n${html}\n${js}`);
  });
});

// build the libary js
const compiler = webpack({
  entry: path.resolve(`${librarySrcFolder}/library.js`),
  output: {
    path: libraryDestFolder,
    filename: 'portal-pages.js'
  }
});
compiler.run((err, stats) => {
  if (err) {
    die(err, 2);
  }
});

// build the library css
sass.render({file: `${librarySrcFolder}/library.scss`}, (err, result) => {
  if (err) {
    die(err, 3);
  }
  else {
    mkdirp.sync(libraryDestFolder);
    fs.writeFileSync(`${libraryDestFolder}/portal-pages.css`, result.css.toString());
  }
});

// copy the assets
ncp(assetsSrcFolder, assetsDestFolder, function (err) {
  if (err) {
    die(err, 4);
  }
});

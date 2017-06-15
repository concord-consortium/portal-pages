// builds the static files in /dest from /src

/*jshint esversion: 6 */

const glob = require("glob");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const sass = require('node-sass');
const webpack = require("webpack");

const portalSrcFolder = path.resolve(`${__dirname}/../src/portals`);
const portalDestFolder = path.resolve(`${__dirname}/../dest/portals`);

const fileContents = (filePath, tag) => {
  let contents = "";
  if (tag === "style") {
    result = sass.renderSync({file: filePath});
    contents = result.css || "";
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
    console.error(err);
    process.exit(1);
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

// build the libary
const compiler = webpack({
  entry: path.resolve(`${__dirname}/../src/library/index.js`),
  output: {
    path: path.resolve(`${__dirname}/../dest/library`),
    filename: 'index.js'
  }
});
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
});



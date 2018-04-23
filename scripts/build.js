// builds the static files in /dest from /src

/*jshint esversion: 6 */

const glob = require("glob");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const sass = require('node-sass');
const webpack = require("webpack");
const webpackConfig = require("../webpack.config");
const ncp = require('ncp').ncp;
const jshint = require('jshint').JSHINT;

const projectFolder = path.resolve(`${__dirname}/..`);
const portalSrcFolder = path.resolve(`${__dirname}/../src/portals`);
const portalDestFolder = path.resolve(`${__dirname}/../dest/portals`);
const librarySrcFolder = path.resolve(`${__dirname}/../src/library`);
const libraryDestFolder = path.resolve(`${__dirname}/../dest/library`);
const siteRedesignSrcFolder = path.resolve(`${__dirname}/../src/site-redesign`);
const siteRedesignDestFolder = path.resolve(`${__dirname}/../dest/site-redesign`);
const siteRedesignAssetsSrcFolder = path.resolve(`${__dirname}/../src/site-redesign/assets`);
const siteRedesignAssetsDestFolder = path.resolve(`${__dirname}/../dest/site-redesign/assets`);
const libraryAssetsSrcFolder = path.resolve(`${__dirname}/../src/library/assets`);
const libraryAssetsDestFolder = path.resolve(`${__dirname}/../dest/library/assets`);

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

// run jshint over all the source files
// read in the .jshintrc file which the api call doesn't pick up automatically
let jshintrc = JSON.parse(fs.readFileSync(`${projectFolder}/.jshintrc`, "utf8"));

let hasErrors = false;
[portalSrcFolder, librarySrcFolder].forEach((basePath) => {
  const files = glob.sync(`${basePath}/**/*.js`);
  files.forEach((file) => {
    jshint(fs.readFileSync(file, "utf8"), jshintrc, jshintrc.globals);
    if (jshint.errors.length > 0) {
      const relativePath = path.relative(__dirname, file);
      jshint.errors.forEach((err) => {
        console.error(`${relativePath}: line ${err.line}, col ${err.character}, ${err.reason}`);
      });
      hasErrors = true;
    }
  });
});
if (hasErrors) {
  die("lint failed", 1);
}

// allow only lint runs with parameter
if (process.argv[2] === "lint") {
  process.exit(0);
}

// get a list of all the .html files in src
glob(`${portalSrcFolder}/**/*.html`, (err, files) => {
  if (err) {
    die(err, 2);
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
const compiler = webpack(Object.assign({
  mode: 'production',
  entry: path.resolve(`${librarySrcFolder}/library.js`),
  output: {
    path: libraryDestFolder,
    filename: 'portal-pages.js'
  }
}, webpackConfig));
compiler.run((err, stats) => {
  if (err) {
    die(err, 3);
  }
  if (stats.hasErrors()) {
    console.log(stats.toString({colors: true}));
    die('webpack errors', 3);
  }
  if (stats.hasWarnings()) {
    console.log(stats.toString({colors: true}));
  }
});

// build the library css
sass.render({file: `${librarySrcFolder}/library.scss`}, (err, result) => {
  if (err) {
    die(err, 4);
  }
  else {
    mkdirp.sync(libraryDestFolder);
    fs.writeFileSync(`${libraryDestFolder}/portal-pages.css`, result.css.toString());
  }
});

// build the site redesign css
sass.render({file: `${siteRedesignSrcFolder}/site-redesign.scss`}, (err, result) => {
  if (err) {
    die(err, 5);
  }
  else {
    mkdirp.sync(siteRedesignDestFolder);
    fs.writeFileSync(`${siteRedesignDestFolder}/site-redesign.css`, result.css.toString());
  }
});

// copy the assets
mkdirp.sync(siteRedesignAssetsDestFolder);
ncp(siteRedesignAssetsSrcFolder, siteRedesignAssetsDestFolder, function (err) {
  if (err) {
    die(err, 6);
  }
});
mkdirp.sync(libraryAssetsDestFolder);
ncp(libraryAssetsSrcFolder, libraryAssetsDestFolder, function (err) {
  if (err) {
    die(err, 7);
  }
});

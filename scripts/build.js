// builds the static files in /dest from /src

/*jshint esversion: 6 */

const glob = require("glob");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");

const die = (message) => {
  console.error(message);
  process.exit(1);
};

const srcFolder = path.resolve(`${__dirname}/../src`);
const destFolder = path.resolve(`${__dirname}/../dest`);

// get a list of all the .html files in src
glob(`${srcFolder}/**/*.html`, (err, files) => {
  if (err) {die(err);}

  const buildComment = `<!-- built using portal pages build script on ${new Date()} -->\n`;

  // iterate over the list creating the concatenated css and html in dest
  files.map((htmlInputFile) => {
    const cssInputFile = `${path.dirname(htmlInputFile)}/${path.basename(htmlInputFile, ".html")}.css`;

    const htmlOutputFile = path.resolve(`${destFolder}/${htmlInputFile.substr(srcFolder.length)}`);
    mkdirp.sync(path.dirname(htmlOutputFile));

    let html = "";
    let css = "";
    try {
      html = fs.readFileSync(htmlInputFile, "utf8");
      css = fs.readFileSync(cssInputFile, "utf8");
    }
    catch (e) {
      // css doesn't exist, not an error
    }

    const htmlOutput = css.length > 0 ? `<style>\n${css}\n</style>\n${html}` : html;
    fs.writeFileSync(htmlOutputFile, buildComment + htmlOutput);
  });
});


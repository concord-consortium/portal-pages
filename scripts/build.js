// builds the static files in /dest from /src

/* jshint esversion: 6 */

const glob = require('glob')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const sass = require('node-sass')
const ncp = require('ncp').ncp

const srcFolder = path.resolve(`${__dirname}/../src`)
const destFolder = path.resolve(`${__dirname}/../dest-portals`)

const portalSrcFolder = path.join(srcFolder, 'portals')
const portalDestFolder = path.join(destFolder, 'portals')
const siteRedesignSrcFolder = path.join(srcFolder, 'site-redesign')
const siteRedesignDestFolder = path.join(destFolder, 'site-redesign')
const siteRedesignAssetsSrcFolder = path.join(srcFolder, 'site-redesign/assets')
const siteRedesignAssetsDestFolder = path.join(destFolder, 'site-redesign/assets')

const die = (err, code) => {
  console.error(err)
  process.exit(1)
}

const fileContents = (filePath, tag) => {
  let contents = ''
  if (tag === 'style') {
    try {
      let result = sass.renderSync({file: filePath})
      contents = result.css || ''
    } catch (e) {}
  } else {
    try {
      contents = fs.readFileSync(filePath, 'utf8')
    } catch (e) {}
  }
  return contents && tag ? `<${tag}>\n${contents}\n</${tag}>` : contents
}

// get a list of all the .html files in src
glob(`${portalSrcFolder}/**/*.html`, (err, files) => {
  if (err) {
    die(err, 2)
  }

  const buildComment = `<!-- built using portal pages build script on ${new Date()} -->`

  // iterate over the list creating the concatenated css and html in dest
  files.forEach((htmlInputFile) => {
    const bareInputFile = `${path.dirname(htmlInputFile)}/${path.basename(htmlInputFile, '.html')}`
    const htmlOutputFile = path.resolve(`${portalDestFolder}/${htmlInputFile.substr(portalSrcFolder.length)}`)

    const html = fileContents(htmlInputFile)
    const css = fileContents(`${bareInputFile}.scss`, 'style')
    const js = fileContents(`${bareInputFile}.js`, 'script')

    mkdirp.sync(path.dirname(htmlOutputFile))

    fs.writeFileSync(htmlOutputFile, `${buildComment}\n${css}\n${html}\n${js}`)
  })
})

// build the site redesign css
sass.render({file: `${siteRedesignSrcFolder}/site-redesign.scss`}, (err, result) => {
  if (err) {
    die(err, 5)
  } else {
    mkdirp.sync(siteRedesignDestFolder)
    fs.writeFileSync(`${siteRedesignDestFolder}/site-redesign.css`, result.css.toString())
  }
})

// copy the assets
mkdirp.sync(siteRedesignAssetsDestFolder)
ncp(siteRedesignAssetsSrcFolder, siteRedesignAssetsDestFolder, function (err) {
  if (err) {
    die(err, 6)
  }
})

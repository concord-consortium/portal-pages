/* jshint esversion: 6 */

module.exports = (app) => {
  const glob = require('glob')
  const path = require('path')
  const express = require('express')
  const router = express.Router()
  const request = require('request')
  const cheerio = require('cheerio')
  const fs = require('fs')
  const chokidar = require('chokidar')
  const mkdirp = require('mkdirp')
  const crypto = require('crypto')
  const sass = require('node-sass')
  const MemoryFS = require('memory-fs')
  const webpack = require('webpack')
  const webpackConfig = require('../../webpack.config')

  // setup library compiler
  const memfs = new MemoryFS()
  const compiler = webpack(Object.assign({
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(`${__dirname}/../../src/library/library.js`),
    output: {
      path: '/',
      filename: 'library.js'
    }
  }, webpackConfig))
  compiler.outputFileSystem = memfs

  const portalSrcFolder = path.resolve(`${__dirname}/../../src/portals`)
  const librarySrcFolder = path.resolve(`${__dirname}/../../src/library`)
  const siteRedesignSrcFolder = path.resolve(`${__dirname}/../../src/site-redesign`)
  const mockFolder = path.resolve(`${__dirname}/../../mock-ajax`)

  const injectedPageStyleId = '__devServerInjectedPageCSS'

  const selfRoot = () => `http://localhost:${app.get('port')}`

  // adapted from https://github.com/tapio/live-server/blob/master/injected.html
  const createInjectedHTML = (files, mock, proxy) => {
    return `
      <!-- injected by development server -->
      <script type="text/javascript">

        // add live server reload and restyle
        if ('WebSocket' in window) {
          (function() {
            var fileMatches = function (json) {
              return json.file && ((${JSON.stringify(files)}.indexOf(json.file) !== -1) || (json.file.indexOf("library") !== -1) || (json.file.indexOf("site-redesign") !== -1));
            };
            var restyle = function (json) {
              if (json.url) {
                var link = document.createElement("LINK");
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", json.url);
                document.body.appendChild(link)
              }
              else {
                document.getElementById('${injectedPageStyleId}').innerHTML = json.css;
              }
            }
            var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
            var address = protocol + window.location.host + window.location.pathname + '/ws';
            var socket = new WebSocket(address);
            socket.onmessage = function(msg) {
              var json = JSON.parse(msg.data);
              switch (json.action) {
                case 'reload': fileMatches(json) && window.location.reload(); break;
                case 'restyle': fileMatches(json) && restyle(json); break;
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
    `
  }

  const handleWatchChange = (changePath) => {
    const broadcast = (json) => {
      json.file = changePath
      const message = JSON.stringify(json)
      app.get('clients').forEach((client) => {
        client.send(message)
      })
    }

    const cacheBuster = (url) => {
      return `${url}?__cacheBuster=${Math.random()}`
    }

    if (path.extname(changePath) === '.scss') {
      if (changePath.indexOf('library') !== -1) {
        compileLibraryCSS((err, libraryCSS) => {
          if (!err) {
            broadcast({
              action: 'restyle',
              url: cacheBuster(`${selfRoot()}/portal-pages.css`)
            })
          }
        })
      } else if (changePath.indexOf('site-redesign') !== -1) {
        compileSiteRedesignCSS((err, siteRedesignCSS) => {
          if (!err) {
            broadcast({
              action: 'restyle',
              url: cacheBuster(`${selfRoot()}/site-redesign/site-redesign.css`)
            })
          }
        })
      } else {
        sass.render({file: changePath}, (err, result) => {
          if (!err) {
            broadcast({
              action: 'restyle',
              css: (result && result.css ? result.css.toString() : '') || ''
            })
          }
        })
      }
    } else {
      broadcast({
        action: 'reload'
      })
    }
  }

  const watcher = chokidar.watch([`${portalSrcFolder}/**/*`, `${librarySrcFolder}/**/*`, `${siteRedesignSrcFolder}/**/*`], {
    persistent: true,
    ignoreInitial: true
  })
  watcher
    .on('change', handleWatchChange)
    .on('add', handleWatchChange)
    .on('unlink', handleWatchChange)
    .on('addDir', handleWatchChange)
    .on('unlinkDir', handleWatchChange)

  const compileLibraryJS = (callback) => {
    compiler.run((err, stats) => {
      if (err) {
        callback(err)
      } else if (stats.hasErrors()) {
        console.log(stats.toString({colors: true}))
        callback(stats.toString({colors: true}))
      } else {
        if (stats.hasWarnings()) {
          console.log(stats.toString({colors: true}))
        }
        callback(null, memfs.readFileSync('/library.js'))
      }
    })
  }

  const compileLibraryCSS = (callback) => {
    sass.render({file: `${librarySrcFolder}/library.scss`}, (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result.css.toString())
      }
    })
  }

  const compileSiteRedesignCSS = (callback) => {
    sass.render({file: `${siteRedesignSrcFolder}/site-redesign.scss`}, (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result.css.toString())
      }
    })
  }

  const injectFakeLogin = (portalHTML, query) => {
    const {student, teacher, admin, manager, researcher, author} = query
    return portalHTML.replace(/Portal.currentUser\s*=\s*{[^<]+<\/script>/, `
      // FAKED LOGIN!
      Portal.currentUser = {
        get isAnonymous() {
          return false;
        },
        get isLoggedIn() {
          return true;
        },
        get isAdmin() {
          return ${admin} == 1;
        },
        get isManager() {
          return ${manager} == 1;
        },
        get isResearcher() {
          return ${researcher} == 1;
        },
        get isAuthor() {
          return ${author} == 1;
        },
        get isTeacher() {
          return ${teacher} == 1;
        },
        get isStudent() {
          return ${student} == 1;
        },
        get firstName() {
          return "Fake";
        },
        get lastName() {
          return "User";
        },
        get fullName() {
          return "User, Fake";
        }
      };
    </script>
    `)
  }

  router.get('/', (req, res, next) => {
    glob(`${portalSrcFolder}/**/*.html`, (err, files) => {
      if (err) {
        res.die(err)
      } else {
        files = files.map((file) => file.substr(portalSrcFolder.length)).sort()
        res.render('index', {
          title: 'Concord Portal Pages Development Server',
          files: files
        })
      }
    })
  })

  router.get('/portal-pages.js', (req, res, next) => {
    compileLibraryJS((err, libraryJS) => {
      if (err) {
        res.die(err)
      } else {
        res.set('Content-Type', 'application/javascript')
        res.send(libraryJS)
      }
    })
  })

  router.get('/portal-pages.css', (req, res, next) => {
    compileLibraryCSS((err, libraryCSS) => {
      if (err) {
        res.die(err)
      } else {
        res.set('Content-Type', 'text/css')
        res.send(libraryCSS)
      }
    })
  })

  router.get('/site-redesign/site-redesign.css', (req, res, next) => {
    compileSiteRedesignCSS((err, siteRedesignCSS) => {
      if (err) {
        res.die(err)
      } else {
        res.set('Content-Type', 'text/css')
        res.send(siteRedesignCSS)
      }
    })
  })

  router.get('/proxy', (req, res, next) => {
    const {file, portal, selector, mock, siteRedesign, fakeLogin} = req.query
    const fileParser = (file || '').match(/\/([^/]+)\/(.+)/)
    const portalParser = (portal || '').match(/^((https?):\/\/([^/]+)\/?)/)

    if (!fileParser || !portalParser) {
      return res.die('Invalid file or portal parameter!')
    }

    const [_, fileDomain, filePath] = fileParser
    const [__, portalRoot, portalProtocol, portalDomain] = portalParser

    const htmlPath = path.resolve(`${portalSrcFolder}/${file}`)
    const scssPath = path.resolve(`${portalSrcFolder}/${file.replace(/\.html$/, '.scss')}`)
    const jsPath = path.resolve(`${portalSrcFolder}/${file.replace(/\.html$/, '.js')}`)

    fs.readFile(htmlPath, 'utf8', (err, localHTML) => {
      if (err) { return res.die('Unable to read local html file!') }

      sass.render({file: scssPath}, (err, result) => {
        // ignore no css file - that is valid
        const localCSS = (result && result.css ? result.css.toString() : '') || ''

        fs.readFile(jsPath, 'utf8', (err, localJS) => {
          // ignore no js file - that is valid
          localJS = localJS || ''

          compileLibraryJS((err, libraryJS) => {
            libraryJS = err ? `alert("#{err.toString()}");` : libraryJS

            compileLibraryCSS((err, libraryCSS) => {
              libraryCSS = libraryCSS || ''

              const options = {
                url: portal,
                headers: {
                  cookie: req.headers.cookie
                }
              }
              request.get(options, (err, response, portalHTML) => {
                if (err) { return res.die(err) }

                const injectedHTML = createInjectedHTML([htmlPath, scssPath, jsPath], !!mock, {
                  port: app.get('port'),
                  protocol: portalProtocol,
                  domain: portalDomain
                })

                // redirect auth urls to proxy server
                let localCode = localJS ? `${localHTML}\n<!-- ${jsPath} -->\n<script>\n${localJS}\n</script>` : localHTML
                localCode = localCode.replace('/users/sign_in', `${selfRoot()}/signin-proxy/${portalProtocol}/${portalDomain}`)
                localCode = localCode.replace('/users/sign_out', `${selfRoot()}/signout-proxy/${portalProtocol}/${portalDomain}`)

                // remove portal html library js and css
                portalHTML = portalHTML.replace(/<script.+portal-pages\.js.+>/, '')
                portalHTML = portalHTML.replace(/<link.+portal-pages\.css.+>/, '')

                // inject the fake login info if requested
                if (fakeLogin) {
                  portalHTML = injectFakeLogin(portalHTML, req.query)
                }

                const $ = cheerio.load(portalHTML)
                $('head').prepend(`<base href="${portalRoot}">`)
                $('head').append(`<!-- portal library js -->\n<script>\n${libraryJS}\n</script>`)
                const siteRedesignLink = siteRedesign ? `<link rel="stylesheet" type="text/css" href="${selfRoot()}/site-redesign/site-redesign.css">` : ''
                $(selector).html(`\n${injectedHTML}\n${siteRedesignLink}\n<!-- portal library css -->\n<link rel="stylesheet" type="text/css" href="${selfRoot()}/portal-pages.css">\n<!-- ${scssPath} -->\n<style id="${injectedPageStyleId}">\n${localCSS}</style>\n<!-- ${htmlPath} -->\n${localCode}\n`)

                res.send($.html())
              })
            })
          })
        })
      })
    })
  })

  router.get('/signout-proxy/:protocol/:domain', (req, res, next) => {
    const session = crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex')
    res.set('Location', req.headers.referer)
    res.cookie('cc_auth_token', '', {expires: new Date(0)})
    res.set('Set-Cookie', `_rails_portal_session=${session}; path=/; HttpOnly`)
    res.send(302, 'Redirecting...')
    /*
      NOTE: this code to request signout from the remote server returns 200 instead of 302 with the auth cookies
            deleted.  Replacing it for now with code to clear the cc_auth_token and redirect manually.
    const {protocol, domain} = req.params;
    const options = {
      url: `${protocol}://${domain}/users/sign_out`,
      headers: {
        cookie: req.headers.cookie
      }
    };
    request.get(options, (err, response, signoutHTML) => {
      if (err) { res.die(err); }
      // set the headers to transfer the auto cookie and redirect back to homepage proxy
      response.headers.location = req.headers.referer;
      res.set(response.headers);
      res.send(response.statusCode, signoutHTML);
    });
    */
  })

  router.post('/signin-proxy/:protocol/:domain', (req, res, next) => {
    const {protocol, domain} = req.params
    const options = {
      url: `${protocol}://${domain}/users/sign_in`,
      headers: {
        cookie: req.headers.cookie
      },
      form: req.body
    }
    request.post(options, (err, response, signinHTML) => {
      if (err) { res.die(err) }
      // set the headers to transfer the auto cookie and redirect back to homepage proxy
      response.headers.location = req.headers.referer
      res.set(response.headers)
      res.send(response.statusCode, signinHTML)
    })
  })

  router.all(/^\/ajax-proxy\/(.+)$/, (req, res, next) => {
    const [type, protocol, domain, ...rest] = req.params[0].split('/')
    if (!type || !protocol || !domain) {
      return res.die(`Invalid ajax-proxy url: ${req.params[0]}`)
    }

    const [beforeQuery, ...afterQuery] = req.url.split('?')
    const query = afterQuery.join('?')
    const proxyPath = rest.join('/')
    const proxyQuery = query.length > 0 ? `?${query}` : ''
    const proxyURL = `${protocol}://${domain}/${proxyPath}${proxyQuery}`
    const method = req.method.toLowerCase()
    const mockQuery = query.length > 0 ? `-${(new Buffer(query)).toString('base64')}` : ''
    const mockPath = path.resolve(`${mockFolder}/${domain}/${proxyPath}${mockQuery}--${method}.json`)

    const proxyRequest = () => {
      console.log('PROXY_URL: ' + proxyURL)
      if (app.get('argv').recordAjax) {
        mkdirp(path.dirname(mockPath), () => {
          const mockStream = fs.createWriteStream(mockPath)
          const pipe = req.pipe(request[method](proxyURL))
          const chunks = []

          pipe.on('data', (chunk) => {
            res.write(chunk)
            chunks.push(chunk.toString())
          })
          pipe.on('end', () => {
            res.end()
            try {
              mockStream.write(JSON.stringify(JSON.parse(chunks.join('')), null, 2))
            } catch (e) {
              mockStream.write(chunks.join(''), null, 2)
            }
            mockStream.end()
          })
        })
      } else {
        req.pipe(request[method](proxyURL)).pipe(res)
      }
    }

    if (type === 'mock') {
      fs.readFile(mockPath, 'utf8', (err, json) => {
        if (err) {
          // fall back to proxy if mock doesn't exist
          proxyRequest()
        } else {
          res.send(json)
        }
      })
    } else {
      proxyRequest()
    }
  })

  return router
}

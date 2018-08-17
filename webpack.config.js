// It looks like a typical Webpack config, although it's missing some basic properties like entry point or output.
// These are defined in two places where Webpack is being used:
//  - build script (scripts/build.js)
//  - development server (server dir)
// Treat this config as a common set of options applied being used in those two places.
// This project doesn't use webpack or webpack-dev-server directly from the command line.
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const destFolder = path.resolve(__dirname, 'dest2')
// There is an alternative way to do this using a 3 file approach
// https://webpack.js.org/guides/production/
// it is probably better to switch that approach
const devMode = process.env.NODE_ENV !== 'production'

function example (name) {
  return new HtmlWebpackPlugin({
    template: `src/examples/${name}.html`,
    filename: `examples/${name}.html`
  })
}

module.exports = {
  // These will be overriden by build.js and index.js

  // developement mode makes webpack-server reload pages faster
  mode: devMode ? 'development' : 'production',
  entry: {
    'portal-pages': './src/library/library.js'
  },
  output: {
    // path: path.resolve(destFolder, './library'),
    path: destFolder,
    filename: 'library/[name].js',
    // in production we are building a seperate css file that lives in 'library' we
    // are using a file-loader (implied by url-loader) config to output assets to
    // library/assets
    // when file-loader saves the asset in library/assets it also updateds the reference
    // to `url(library/assets/...)` but that doesn't work because the css file itself is
    // inside of the library folder. Setting publicPath to '../' fixes this problem for
    // the css file. It adds a prefix so in the css it is now `url(../library/assets/...)`
    // it also fixes the problem when demoing with the dev server on an html page in
    // examples. In that case the css is injected in the dom of the html page so the
    // `url(../library/assets/...)` is now relative to the html page.
    // However this is fragile. If the examples folder has a subfolder then that will
    // become a problem. Perhaps if the examples are built with HtmlWebpackPlugin it will
    // take care of this somehow (but I doubt it).
    // Another option is to set publicPath: '/' this works in both cases because
    //    `url(/library/assets/...)`
    // works.  But this doesn't work when deployed to production where the portal pages is
    // not located at the domain root.
    publicPath: '../'
  },
  // end of overriden properties

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: [/node_modules[\\/].*\.(css|scss)$/, /library.scss$/],
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        exclude: [/node_modules/, /library.scss$/],
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]--[hash:base64:8]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // This assumes all assets greater than 10000k,
          // should go in the library/assets folder.
          // In practice this is fine, but it is a bit weird because some assets might
          // be located outside of the src/library folder
          outputPath: 'library/assets'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/examples/portal-api.js',
        to: 'examples/'
      },
      {
        from: 'src/examples/mock-data',
        to: 'examples/mock-data'
      }
    ]),
    new MiniCssExtractPlugin(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'library/[name].css',
        // TODO figure out what this does
        chunkFilename: '[id].css'
      }
    ),
    example('header-itsi'),
    example('navigation-compact'),
    example('navigation'),
    example('signup-after-sso'),
    example('signup')
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}

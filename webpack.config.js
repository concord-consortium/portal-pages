// It looks like a typical Webpack config, although it's missing some basic properties like entry point or output.
// These are defined in two places where Webpack is being used:
//  - build script (scripts/build.js)
//  - development server (server dir)
// Treat this config as a common set of options applied being used in those two places.
// This project doesn't use webpack or webpack-dev-server directly from the command line.
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const destFolder = path.resolve(__dirname, 'dest2')
// There is an alternative way to do this using a 3 file approach
// https://webpack.js.org/guides/production/
// it is probably better to switch that approach
const devMode = process.env.NODE_ENV !== 'production'

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
    filename: 'library/[name].js'
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
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/examples/',
        to: 'examples'
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
    )
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}

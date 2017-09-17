var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const EVENT = process.env.npm_lifecycle_event || '';

function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

const isProd = false;
const AOT = hasNpmFlag('aot');

module.exports = {
  devtool: 'source-map',

  externals: {
    'child_process': 'childProcess',
    'fs': 'fileSystem',
    'electron': 'electronExternal'
  },

  entry: {
    'angular2': [
      'rxjs',
      '@angular/core',
      '@angular/router',
      '@angular/http'
    ],
    'app': './app/app'
  },

  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.html']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // {
          //   loader: '@angularclass/hmr-loader',
          //   options: {
          //     pretty: !isProd,
          //     prod: isProd
          //   }
          // },
          // { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
          //   loader: 'ng-router-loader',
          //   options: {
          //     loader: 'async-import',
          //     genDir: 'compiled',
          //     aot: AOT
          //   }
          // },
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.json'
            }
          },
          // {
          //   loader: 'angular2-template-loader'
          // }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: 'angular2', filename: 'angular2.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.js' }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};
const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');

// build directory: docs/${VERSION}
const VERSION = 'dev';

const WebpackConfig = {
  entry: {
    main: path.join(__dirname, 'js', 'main.jsx'),
    fc: path.join(__dirname, 'js', 'fc.jsx'),
    pc: path.join(__dirname, 'js', 'pc.jsx'),
  },
  output: {
    path: path.join(__dirname, 'docs', VERSION),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [["es2015", { modules: false }], "react"],
            plugins: ["transform-react-inline-elements"]
          }
        }
      ]
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
};

function build(done) {
  webpack(WebpackConfig, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    done();
  });
}

function serve() {
  const server = require('webpack-dev-server');

  new server(webpack(WebpackConfig), {
    contentBase: path.join(__dirname, 'docs', VERSION),
    stats: {
      colors: true
    }
  }).listen(8080, '0.0.0.0', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[serve]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
}

exports.build = build;
exports.serve = serve;

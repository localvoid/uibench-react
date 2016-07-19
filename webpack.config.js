const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, 'js', 'main.jsx'),
    fc: path.join(__dirname, 'js', 'fc.jsx'),
    pc: path.join(__dirname, 'js', 'pc.jsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel?{ "presets": ["es2015-loose", "react"], "plugins": ["transform-react-inline-elements"] }']
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
};

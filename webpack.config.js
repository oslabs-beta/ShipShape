const path = require('path');

module.exports = {

  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill', path.resolve(__dirname, 'client/index.js')],
  output: {
    // path
    path: path.resolve(__dirname, 'build'),
    // file name
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/build',
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Translates sass into CommonJS
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
}
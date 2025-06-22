/* eslint max-len: 0 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const neatPath = require('node-neat').includePaths[1];
const bourbonPath = require('node-bourbon').includePaths;
const autoprefixer = require('autoprefixer');
const path = require('path');

const config = {
  entry: [
    './src/app/Index.jsx',
  ],
  output: {
    path: `${__dirname}` + '/dist',
    filename: '[name].bundle.js',
  },
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': `"${process.env.NODE_ENV}"`,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'src/app/index.html',
      favicon: 'src/app/images/favicon.ico',
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /\.spec\.js?$/],
        loader: 'babel-loader',
      },
      {
        test: /\.yml$/,
        loader: 'json!yaml',
      },
      {
        test: /\.jsx?$/,
        include: /\.spec\.js?$/,
        loader: 'ignore-loader',
      },
      {
        test: /\.scss$/,
        loader: `style!css!postcss!sass?sourceMap&includePaths[]=${bourbonPath}&includePaths[]=${neatPath}`,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|png|gif|ico)(\?[\s\S]+)?$/,
        loader: 'file?name=[name].[hash].[ext]',
      },
    ],
  },
  postcss: [
    autoprefixer(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src/'),
    ],
  },
};

module.exports = config;

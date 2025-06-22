/* eslint max-len: 0 */
const webpack = require('webpack');
const neatPath = require('node-neat').includePaths[1];
const bourbonPath = require('node-bourbon').includePaths;
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const environment = process.env.NODE_ENV;

const config = {
  entry: [
    './src/app/Index.jsx',
  ],
  output: {
    path: `${__dirname}/dist/${environment}`,
    filename: '[name].bundle.[chunkhash].js',
    chunkFilename: '/async/[name].bundle.[chunkhash].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.yml$/,
        loader: 'json!yaml',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', `css!postcss!sass?sourceMap&includePaths[]=${bourbonPath}&includePaths[]=${neatPath}`, {
          publicPath: '',
        }),
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
  plugins: [
    new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.ENVIRONMENT': `"${environment}"`,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: 'src/app/index.html',
      favicon: 'src/app/images/favicon.ico',
      title: 'Møtebooking',
    }),
  ],
};

module.exports = config;

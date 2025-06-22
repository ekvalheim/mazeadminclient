/* eslint max-len: 0 */
const webpack = require('webpack');
const neatPath = require('node-neat').includePaths[1];
const bourbonPath = require('node-bourbon').includePaths;
const path = require('path');

const config = {
  entry: [
    './src/app/Index.jsx',
  ],
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  debug: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': `"${process.env.NODE_ENV}"`,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', 'css'],
    root: [
      path.resolve('./src/'),
    ],
  },
  module: {
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
};

module.exports = config;

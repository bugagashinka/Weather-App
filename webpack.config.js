const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';

const config = {
  entry: path.resolve(__dirname, './src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(svg|jpe?g|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: './',
          },
        },
      },
      {
        test: /\.(js)$/,
        exclude: '/node_modules',
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['**/*'],
    }),
    new HtmlWebpackPlugin({
      title: 'Weather forecast',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isProductionMode ? '[name].[hash].css' : '[name].css',
    }),
  ],
  mode: isProductionMode ? 'production' : 'development',
  optimization: {
    // We no not want to minimize our code. FIXME
    minimize: false,
  },
  devtool: isProductionMode ? '' : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
  },
};
module.exports = config;

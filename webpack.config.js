const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin(),
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ],
  devServer: {
    contentBase: './dist'
  },
};
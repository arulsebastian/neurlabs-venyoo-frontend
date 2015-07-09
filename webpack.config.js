const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const config = {
  entry: {
    app: ["./src/index"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },
      {
        test: /\.(woff)|(eot)|(svg)|(ttf)$/,
        loader: "file-loader"
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./build"),
    publicPath: "/",
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ],
  resolve: {
    extensions: ["", ".js", ".scss"],
    modulesDirectories: ["src", "node_modules"],
  },
};

module.exports = config;

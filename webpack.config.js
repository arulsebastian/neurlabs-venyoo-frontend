const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const config = {
	entry: {
		app: ["./src/index.js"]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ["babel"],
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style", "css!sass")
			},
			{
				test: /\.(jpg)|(png)|(woff)|(eot)|(ttf)|(svg)$/,
				loader: "file"
			},
			{
				test: /\.(html)$/,
				loader: "file?name=[name].[ext]"
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

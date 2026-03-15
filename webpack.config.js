const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    port: 3000,
    proxy: [
      {
        context: ["/submissions"],
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    ],
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_BASE': JSON.stringify(process.env.REACT_APP_API_BASE || ''),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

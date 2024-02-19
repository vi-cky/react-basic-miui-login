const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

require("dotenv").config();

module.exports = {
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.EnvironmentPlugin(
      Object.keys(process.env).filter((envName) => {
        return envName.match(/^REACT_APP_*/);
      })
    ),
  ],
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname + "/build"),
    publicPath: "/",
    filename: "bundle.[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc)ss$/,
        include: [
        ],
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, "public", "css"),
          // path.resolve(__dirname, "src", "Assets"),
          // path.resolve(__dirname, "src", "LMS", "Style"),
          // path.resolve(__dirname, "src", "LMS", "Layout"),
          path.resolve(__dirname, "node_modules", "antd", "dist"),
        ],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        include: [path.resolve(__dirname, "src", "Assets")],
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|ico)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      crypto: false,
      util: require.resolve("util"),
    },
    symlinks: false,
    cacheWithContext: false,
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

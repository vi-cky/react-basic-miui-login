const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT || 3000;

module.exports = merge(commonConfig, {
  devtool: "eval",
  mode: "development",
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "./public"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true,
    port: port,
    historyApiFallback: true,
  },
});

const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const DIST_DIR = path.join(__dirname, "dist");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: DIST_DIR,
    port: 5000,
    hot: true,
    publicPath: "/dist",
    writeToDisk: true,
    historyApiFallback: true,
  },
  devtool: "eval",
  watchOptions: {
    ignored: ["node_modules/**", "public/imgs/**", "public/index.html"]
  },
});

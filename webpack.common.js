const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DIST_DIR = path.join(__dirname, "dist");
const SRC_DIR = path.join(__dirname, "src");

module.exports = {
  entry: SRC_DIR + "/index.js",
  output: {
    path: DIST_DIR,
    filename: "[name].dist.js",
    chunkFilename: "[name].dist.js",
    pathinfo: false,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Giphy Trending",
      minify: true,
      template: "./public/index.html"
    }),
  ]
};

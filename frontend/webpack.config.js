require("dotenv").config();

const webpack = require("webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "public"
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: [".js", ".json", ".css"],
    alias: {
      "~": path.resolve(__dirname, "src/")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/(webpack-dev-server))/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.svg$/,
        loader: "vue-svg-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: process.env.NODE_ENV === "production",
      debug: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_BASE_URL: JSON.stringify(process.env.API_BASE_URL)
      }
    })
  ],
  target: "web",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true
  }
};

if (process.env.NODE_ENV === 'test') {
  config.externals = [require('webpack-node-externals')()]
  config.devtool = 'inline-cheap-module-source-map'
}

module.exports = config;

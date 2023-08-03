const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

const manifestConfig = {
  name: "Text Editor",
  short_name: "Text Editor",
  description: "A text editor that runs in the browser!!",
  background_color: "#7eb4e2",
  theme_color: "#7eb4e2",
  start_url: "./",
  publicPath: "./",
  icons: [
    {
      src: path.resolve("src/images/logo.png"),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join("assets", "icons"),
    },
  ],
};

const jsLoader = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
      plugins: [
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/transform-runtime",
      ],
    },
  },
};

const cssLoader = {
  test: /\.css$/i,
  use: ["style-loader", "css-loader"],
};

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest(manifestConfig),
    ],
    module: {
      rules: [jsLoader, cssLoader],
    },
  };
};

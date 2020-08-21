const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const isDev = mode == "development";
const isProd = !isDev;

console.log(`Launch webpack with ${mode} configuration`);

const filename = (extension) =>
  isDev ? `[name].${extension}` : `[chunkhash].${extension}`;

const cssLoaders = (extra) => {
  const loaders = ["style-loader", "css-loader"];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env"],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: mode,
  entry: { main: ["@babel/polyfill", "./index.jsx"] },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    port: 4020,
    hot: true,
  },
  devtool: isDev ? "source-map" : "",
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelOptions(),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelOptions("@babel/preset-react"),
      },
    ],
  },
};

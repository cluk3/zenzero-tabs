const path = require("path");

module.exports = {
  entry: "./src/background.js",
  output: {
    path: path.resolve(__dirname, "../main/build"),
    filename: "background.js"
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};

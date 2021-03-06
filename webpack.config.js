const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
  },
  devtool: "eval-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src/assets'), to: path.join(__dirname, 'dist/assets') },
        { from: path.join(__dirname, 'index.html'), to: path.join(__dirname, 'dist/index.html') },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
  
};
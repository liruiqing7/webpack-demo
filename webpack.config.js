const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
// plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./src/index.js",
  },
  devServer: {
    contentBase: "./dist",
    // 服务启动在dist目录下
    open: true,
    hot: true,
    hotOnly: true,
    // hotOnly => 即便是HMR没有生效，浏览器也不会自动刷新
    // 项目运行时，自动打开浏览器
    // port: 8000 ,
    // 端口号
    // proxy:{
    // 	'/api':'http://localhost:3000'
    // }
    // 接口代理，如果访问api，会被代理到http://xxx
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // exclude ,不对该对象中的文件进行编译，一般第三方自己就做了编译
        loader: "url-loader",
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 10240,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // modules: true
              // css 模块化 ，类似设置一个作用域,阻止css样式的全局污染
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "sass-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并将打包生成的js自动引入到这个html文件中。
  // CleanWebpackPlugin 会在打包之前，删除对应目录下得文件，使webpack重新打包生成文件
  // HotModuleReplacementPlugin 开启webpack的HMR功能
  output: {
    publicPath: "/",
    // publicPath 当静态资源放在cdn上时，可以使用publicPath给资源加前缀。
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};

// 在node中使用webpack
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const complier = webpack(config)

// 首先引入webpack库，接着引入webpack的配置文件，最后使用complier结合webpack和config进行编译

const app = express();
app.use(webpackDevMiddleware(complier,{
  publicPath: config.output.publicPath
}))
// 只要文件发生改变，就会重新运行complier,生成新的publicPath

app.listen(3000,()=>{
  console.log('server is running')
})


// 没有webpack-dev-server 舒服，node需要降级到8.1.0配合。
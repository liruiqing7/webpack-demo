# webpack-demo

learn about webpack

webpack 是什么？
webpack 是一个模块打包工具。它做的事情就是，分析你的项目结构，找到相关模块（浏览器不能直接运行的语言或资源），并将其打包成合适的格式以供浏览器使用。

webpack 的作用：

- 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间正确引用，执行有序。利用打包我们就可以在开发的时候，根据我们自己的业务需求，自由划分文件模块，保证项目结构的清晰和可读性。
- 编译兼容。在前端的「上古时期」，手写一堆浏览器兼容代码是一件很头疼的事情。而现在，我们通过`webpack`的`Loader`机制，不仅可以帮助我们对代码做`polyfill`，还可以编译和转译诸如，`.less`、`.vue`,`.jsx`这类浏览器无法识别的文件，让我们在开发时可以使用新特性和新语法做开发，提高开发效率。
- 能力扩展。通过`webpack`的`Plugin`机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如，按需加载、代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

webpack 的打包运行原理：

1. 读取 webpack 的参数配置。
2. 启动 webpack，创建 Comiler 对象并开始解析项目。
3. 从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树。
4. 对不同文件类型的依赖模块文件使用对应的 Loader 进行编译，最终转为 JavaScript 文件。
5. 整个过程中，webpack 会通过发布订阅模式，向外抛出一些 hooks,而 webpack 得插件即可通过监听这些关键得事件节点，执行插件任务进而达到干预输出结果得目的。

sourceMap：

- 它是一个映射关系，它可以将打包后文件的目标生成代码与打包前的源代码的关系对应起来。
- 例如：当打包生成后的 dist 目录下 main.js 文件 96 行出错了，它可以知道实际上对应的是 src 目录下 index.js 文件中的第一行出错了。
- 具体使用：将 devtool 的属性设置为 'source-map'，但如果不对 devtool 配置，它将默认配置 source-map。
- inline-source-map 会将.map(映射文件)通过 data-url(base64)的方式，直接打包到 js 中。
- cheap-inline-source-map
  1. 『inline-source-map』的提示信息会具体到「哪一行的第几个字符」，当代码量很大的时候比较耗费性能，加上 cheacp 可以只具体到「哪一行」以此来提升性能。
  2. 加上「cheap」后，sourceMap 打包时会只关注业务代码，不会去关注引入的第三方代码。cheap-module-inline-source-map 会关注第三方代码。
- eval
  1. 不会生成.map 文件，也不会有 base64 的字符串，它会通过 eval 的方式执行，会有 sourceURL 直接指向当前的 index.js。
  2. 打包最快，性能最好的一种打包方式，但当代码量比较大，此方式可能会造成提示不全面的问题。
- 最佳实践
  1. 开发环境，cheap-module-eval-source-map : 打包最快，性能最好且提示全面。
  2. 线上环境，可以用 cheap-module-source-map ，提示效果会更好。

WebpackDevServer:

- 打包之后的文件没有放到 ist 目录下，而是放在了内存中，可以有效提高打包速度，提升开发效率。
- webpack --watch: webpack 监听打包文件，如果源代码发生变化，它将立即打包生成新的目标代码。
- webpack-dev-server: 不但会监听文件的改变，自动打包，还会刷新浏览器。
- 使用 file 形式打开文件，如果想要发送 ajax 请求是不可能的，所以我们需要启用一个 local 服务。
- proxy：
  1. 跨域代理，React/Vue 常用。因为这两个脚手架底层使用了 WebpackDevServer。
- 早期的 WebpackDevServer 并不是很好用，所有有些脚手架工具自己写了一些服务器工具。现在基本都在使用。

Hot Module Replacement 模块热更新:

- 实现热更新的效果，需要些 module.hot，但有一些 `loader` 或者 `babel perset` 中帮我们实现了这部分功能，例如 React，Vue，但引入比较偏的文件，还是需要自己手动写一下。
- 如何使用：
  1. 引入 webpack 到 webpack.config 中
  2. 在 devServe 中配置 hot:true,hotOnly:true,
  3. plugin 插件中添加：new webpack.HotMoudleReplacementPlugin()
  4. 在 js 代码中增加监听代码
  ```js
    if(hot.module){
      module.accept({'file name'},()=>{
        // to do something
      })
    }
  ```

使用 Babel 处理 ES6 语法

- 如何使用 Babel : npm install --save-dev babel-loader @babel/core
- `babel/core` 是 babel 的核心库，它能够使 babel 识别 js 代码中的内容，然后转换成 AST 抽象语法树，再把抽象语法树编译生成一个新的语法。
- babel/polyfill 是通过全局变量的方法注入代码，会造成全局污染。解决：引入 transform-runtime，它会使用闭包的方式打包代码。

- promise、map 需要在低版本浏览器里注入进来，需要引入 babel/polyfill，这会使我们的包体积很大，所以，需要配置 useBuiltIns，他会检测文件中使用了哪些代码，从而只注入我们需要的代码，这会降低包体积。优化：使用 transform-runtime

webpack 性能优化

- 1.升级打包工具的版本，跟上技术的迭代；
  升级 webpack、node、npm，yarn 版本；
- 2.在尽可能少的模块上应用 loader;
  比如打包 js 模块，需要添加 exclude:/node_modules/，避免 node_modules 下面的模块使用 loader；
- 3.尽量少的使用 plugin;
  比如在 dev 环境中不必使用 MiniCssExtractPlugin 插件提取 css 文件；不必使用 OptimizeCssAssetsPlugin 来压缩 css 文件；也可使用 include 指定的模块使用 Loader；
- 4.默认 resolve.extensions 的值有：'.wasm', '.mjs', '.js', '.json';
  合理的配置 resolve，比如 extensions（默认的文件类型）;mainFiles（默认子文件名）；alias(模块别名)
- 5.dll 优化,提高打包速度；
  使用 webpack.DllPlugin 生成 mainfest.json 文件和通过 webpack.dll.config 多入口文件，通过 output.library 参数控制打包生成的 dll 文件；
  使用 webpack.DllReferencePlugin 文件引入 mainfest 文件（模块的映射文件）；
  使用 AddAssetHtmlWebpackPlugin 往 html 文件插入已经打包好的 dll 文件；
- 6.控制包的大小：用不到的就不引入或者使用 tree-shaking，或者使用 splitChunks 拆包
- 7.多进程打包 happyPack thread-loader
- 8.合理使用 sourceMap：不同环境使用合适的配置
- 9.结合 stats 分析打包结果
- 10.开发环境内存编译：使用 webpackDevServer，打包出的文件放在内存中
- 11.开发环境无用插件剔除：开发环境 mode 设置为 development

**搭建基础的typescript项目**

1、安装nodejs环境后，执行命令

npm i typescript -g

全局安装后，可以在任何地方使用 **tsc** 的编译器

执行命令

tsc -h

可查看 tsc 命令下的所有方法

![img](C:\Users\LHX\AppData\Local\YNote\data\qqC429B3F16869E2A89FA41E430DA9AC53\b4e9e3163a9e4e1eafd9c5c3af6ccd80\clipboard.png)

2、执行 ts 初始化指令

tsc --init

会生成一个 tsconfig.json 的 ts 配置文件

3、新建一个 src 文件夹，在里面新建一个 index.ts 文件，并输入

let hello:string = "Hello TypeScript";

![img](C:\Users\LHX\AppData\Local\YNote\data\qqC429B3F16869E2A89FA41E430DA9AC53\11d186cfe19846d7a909d5c7c60d0f91\clipboard.png)

然后在终端对写好的 ts 文件执行 tsc 命令

tsc ./src/index.ts

就会生成一个 js 文件

![img](C:\Users\LHX\AppData\Local\YNote\data\qqC429B3F16869E2A89FA41E430DA9AC53\7b6286bece7b435a8a06ac907814bb53\clipboard.png)

**利用 webpack 搭建可使用 TypeScript 的项目**

我们将从零开始搭建适用于TypeScript的 webpack 配置项

1、首先安装 webpack、webpack-cli、webpack-dev-server

npm i webpack webpack-cli webpack-dev-server -D

然后再安装 ts-loader 和 typescript 帮助编译 ts 文件

npm i ts-loader typescript -D

最后还要 安装一个插件 htmlwebpackplugin ，它的作用是 通过一个模板帮我们生成一个网站的首页，而且自动的帮我们把输出的文件嵌入到这个文件中

npm i html-webpack-plugin -D

2、安装完上诉依赖后，我们在根目录下新建一个 build 文件夹用来做 webpack 的配置项，并在里面新建一个 webpack.base.config.js 文件来配置以上的依赖

const HtmlWebpackPlugin = require('html-webpack-plugin') module.exports = {   entry: './src/index.ts', // 入口文件   output:{     filename: 'app.js' // 输出文件   },   resolve: {     extensions: ['.js','.ts','.tsx'] // 匹配编译的文件类型   },   module: {     rules: [       {         test: /\.tsx?$/i, // 匹配 ts 或 tsx 文件做 ts-laoder 编译         use:[           {             loader: 'ts-loader'           }         ],         exclude:/node_modules/       }     ]   },   plugins:[     new HtmlWebpackPlugin({ // 使用 htmlwebpackplugin 编译生成最后的页面       template: './src/tpl/index.html'     })   ] }

再新建一个开发环境下的配置文件 webpack.dev.config.js 

module.exports = {    devtool: 'cheap-module-eval-source-map'    // cheap 表示 source-map 会忽略文件的类信息，因为调试的时候类信息是没有用的    // module 表示会定位我们的 ts 源码而不是 loader 转译后的 js 源码    // eval-source-map 表示会将 source-map 打包成 data-url 的形式打包在文件中，它的重编译速度很快，不需担心性能问题     }

然后是生产环境的配置文件 webpack.pro.config.js 

const {CleanWebpackPlugin} = require('clean-webpack-plugin') // 每次构建时都清空 dist 目录 // 因为为了避免缓存，构建时会带有hash值 // 导致重新构建时会有很多无用的文件需要清理 module.exports = {   plugins: [     new CleanWebpackPlugin()   ] }

完成上诉配置文件后，最后用 webpack.config.js 将上诉配置文件用 webpack-merge 进行合并

我们先安装下：

npm i webpack-merge -D

文件内容：

const {merge}= require('webpack-merge'); const baseConfig = require('./webpack.base.config') const devConfig = require('./webpack.dev.config') const proConfig = require('./webpack.pro.config') let config = process.NODE_ENV === 'development' ? devConfig : proConfig module.exports = merge(baseConfig,config);

3、修改 npm 指令

在 package.json 中我们修改 main 的入口为 "./src/index.ts"，并新增一个 start 指令

"start":"webpack-dev-server --mode=development --config ./build/webpack.config.js"

4、最后执行启动命令

npm start

要是出现 Cannot find module 'webpack-cli/bin/config-yargs' 的报错，说明是 webpack-cli 的版本不是3的版本，要执行命令安装webpack-cli 的版本为 3 的版本

npm uninstall webpack-cli // 卸载已安装的 webpack-cli npm i webpack-cli@3 -D // 安装第3版本的 webpack-cli

5、完成以上操作后，可正常使用 TypeScript，但最后的最后，我们还需要有构建生产环境的命令

"build":"webpack --mode=production --config ./build.webpack.config.js"

执行命令

npm run build

就可以生成一个 dist 文件夹
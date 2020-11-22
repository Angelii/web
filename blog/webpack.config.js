const path = require('path') //path包，处理路径的
const webpack = require('webpack') // 用于访问内置插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const { utils } = require('stylus')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/main.js'), //声明入口，使用绝对路径。 __dirname根路径的绝对地址。
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"': '"production"'
      }
    }),
    new HTMLPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|otf|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.vue$/, //检测文件类型 点需要转义
        use: 'vue-loader' //
      },
      {
        test: /\.jsx$/, 
        use: [
          'babel-loader', 
        ]
      },
      {
        test: /\.css$/, //检测文件类型
        use: [
          'style-loader', //写好的css在js里面以js的形式呈现
          'css-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {loader: 'html-loader'},
          {loader: 'markdown-loader', options: {}}
        ]
      },
      {
        test: /\.styl$/, //检测文件类型
        use: [
          'style-loader', //写好的css在js里面以js的形式呈现
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/, //检测文件类型 点需要转义
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 1024,
              name: "[name].[ext]",
              publicPath: "../dist/images",
              outputPath:"assets/images"//打包之后的存放路径   文件夹名
            }
          }
        ]
      },
    ]
  }
}

//配置根据不同的环境进行配置
if(isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8001,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    open:true,//启动webpack-dev-server时自动打开浏览器
    hot:true //启用热更
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), //
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
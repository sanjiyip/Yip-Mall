const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 生产环境用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 环境变量设置
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取 html-webpack-plugin 参数的方法（返回一个对象作为插件的参数，参数 name 就是页面的名称）
let getHTMLConfig = name => {
  return {
    template: path.join(__dirname, `./src/view/${name}.html`), //定义插件读取的模板文件是根目录下的[name].html
    filename: `view/${name}.html`, //定义通过模板文件新生成的页面名称
    inject: true,
    hash: true,
    chunks: ['common', name] // chunks 成员必须是 entry 中的属性名
  };
};

// webpack config
const config = {
  entry: {
    common: [path.join(__dirname, './src/page/common/index.js')],
    index: [path.join(__dirname, './src/page/index/index.js')],
    login: [path.join(__dirname, './src/page/login/index.js')]
  },
  output: {
    path: path.join(__dirname, './dist'),
    // publicPath: path.join(__dirname, './dist'), //生产环境用
    publicPath: '/dist', //开发环境用
    filename: 'js/[name].bundle-[hash].js' // 在文件名前加上路径，就可以生成文件夹
  },
  // webpack-dev-server
  devServer: {
    contentBase: './'
  },
  // 引入外部 jquery 库，并定义为全局变量
  externals: {
    jquery: 'window.$'
  },
  module: {
    rules: [
      // sass-loader
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        })
      },
      // url-loader
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '/resource/[name].[ext]'
            }
          }
        ]
      },
      // html-loader
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    // HTML 模板页面模板(多页面就需要多个 HTML 模板)
    new HtmlWebpackPlugin(getHTMLConfig('index')),
    new HtmlWebpackPlugin(getHTMLConfig('login')),
    // 提取公共模块的插件 —— 会将重复使用的代码提取出来
    new webpack.optimize.CommonsChunkPlugin({
      // name 与 entry 中的属性同名时，将 entry 对应的模块放入下面的代码中
      name: 'common',
      filename: 'js/base.bundle-[hash].js'
    }),
    // 提取单独的 css
    new ExtractTextPlugin({
      filename: 'css/[name].bundle-[hash].css'
    })
  ]
};

// 开发环境
if (WEBPACK_ENV === 'dev') {
  // 使得多页面能够生效
  config.entry.common.push('webpack-dev-server/client?http://localhost:8080');
}

// 生产环境
if (WEBPACK_ENV !== 'dev') {
  // 清除旧的 dist 文件夹插件 （生产环境使用CleanWebpackPlugin）
  config.plugins.push(new CleanWebpackPlugin(['dist']));
  config.output.publicPath = path.join(__dirname, './dist');
}

module.exports = config;

/*
 * @Author: yip 
 * @Date: 2018-02-10 14:50:26 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-06 12:15:32
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 生产环境用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 环境变量设置
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取 html-webpack-plugin 参数的方法（返回一个对象作为插件的参数，参数 name 就是页面的名称）
let getHTMLConfig = (name, title) => {
  return {
    template: path.join(__dirname, `./src/view/${name}.html`), //定义插件读取的模板文件是根目录下的[name].html
    filename: `view/${name}.html`, //定义通过模板文件新生成的页面名称
    title: title,
    favicon: './favicon.ico', // favicon图标
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
    list: [path.join(__dirname, './src/page/list/index.js')],
    detail: [path.join(__dirname, './src/page/detail/index.js')],
    cart: [path.join(__dirname, './src/page/cart/index.js')],
    payment: [path.join(__dirname, './src/page/payment/index.js')],
    about: [path.join(__dirname, './src/page/about/index.js')],
    'order-confirm': [
      path.join(__dirname, './src/page/order-confirm/index.js')
    ],
    'order-list': [path.join(__dirname, './src/page/order-list/index.js')],
    'order-detail': [path.join(__dirname, './src/page/order-detail/index.js')],
    'user-login': [path.join(__dirname, './src/page/user-login/index.js')],
    'user-register': [
      path.join(__dirname, './src/page/user-register/index.js')
    ],
    'user-pass-reset': [
      path.join(__dirname, './src/page/user-pass-reset/index.js')
    ],
    'user-pass-update': [
      path.join(__dirname, './src/page/user-pass-update/index.js')
    ],
    'user-center': [path.join(__dirname, './src/page/user-center/index.js')],
    'user-center-update': [
      path.join(__dirname, './src/page/user-center-update/index.js')
    ],
    result: [path.join(__dirname, './src/page/result/index.js')]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath:
      WEBPACK_ENV !== 'dev' ? '//s.happymmall.com/mmall-fe/dist/' : '/dist/', //线上环境使用（www.sanjiyip.com）
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
  // 路径别名：
  resolve: {
    alias: {
      // 此法可以直接用属性名来代替路径的部分字段
      util: path.resolve(__dirname, './src/util'),
      page: path.resolve(__dirname, './src/page'),
      image: path.resolve(__dirname, './src/image'),
      view: path.resolve(__dirname, './src/view'),
      service: path.resolve(__dirname, './src/service'),
      node_modules: path.resolve(__dirname, './node_modules')
    }
  },
  // loader
  module: {
    rules: [
      // babel-loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      // sass-loader
      {
        test: /\.scss$/,
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
              name: '/resource/[name].[ext]'
            }
          }
        ]
      },
      // html-loader
      {
        test: /\.string$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
              removeAttributeQuotes: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // HTML 模板页面模板(多页面就需要多个 HTML 模板)
    new HtmlWebpackPlugin(getHTMLConfig('index', '首页')),
    new HtmlWebpackPlugin(getHTMLConfig('list', '商品列表')),
    new HtmlWebpackPlugin(getHTMLConfig('detail', '商品详情')),
    new HtmlWebpackPlugin(getHTMLConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHTMLConfig('about', '关于YipMall')),
    new HtmlWebpackPlugin(getHTMLConfig('order-confirm', '订单确认')),
    new HtmlWebpackPlugin(getHTMLConfig('order-list', '订单列表')),
    new HtmlWebpackPlugin(getHTMLConfig('order-detail', ' 订单详情')),
    new HtmlWebpackPlugin(getHTMLConfig('payment', '订单支付')),
    new HtmlWebpackPlugin(getHTMLConfig('user-login', '登录')),
    new HtmlWebpackPlugin(getHTMLConfig('user-register', '注册')),
    new HtmlWebpackPlugin(getHTMLConfig('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHTMLConfig('user-center', '用户中心')),
    new HtmlWebpackPlugin(getHTMLConfig('user-center-update', '修改用户信息')),
    new HtmlWebpackPlugin(getHTMLConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHTMLConfig('result', '操作结果')),

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
}

module.exports = config;

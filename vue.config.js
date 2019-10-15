
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
module.exports = {
    css: {
      loaderOptions: {
        css: {},
        postcss: {}
      }
    },
    configureWebpack: config => {
    },
    parallel: false,
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    chainWebpack: config => {
      config.module
        .rule('ts')
        .use('ts-loader')
        .tap(options => {
          options = merge(options, {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'vant',
                  libraryDirectory: 'es',
                  style: true
                })
              ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          });
          return options;
        });
    },
    devServer: {
      // 配置代理
      proxy: {
        '/api': {
          target: 'http://xmall.exrick.cn/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/'
          }
      }
    }
      // proxy: {
      //   '/member/*': {
      //     target: 'http://127.0.0.1:7777' // 请求本地 需要xmall后台项目 默认127.0.0.1:7777 
      //   },
      //   '/goods/*': {
      //     target: 'http://127.0.0.1:7777' // 请求本地 需要xmall后台项目 默认127.0.0.1:7777
      //   }
      // }
    },
  }
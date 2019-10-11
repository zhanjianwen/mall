
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
    publicPath: process.env.NODE_ENV === 'production' ? '/mall/' : '/',
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
    }
    // devServer: {
    //   // 配置代理
    //   proxy: {
    //     '/api': {
    //       ws: false,   // 禁用websocket
    //       target: 'http://127.0.0.1:8848/',
    //       changeOrigin: true,
    //     }
    //   }
    // },
  }
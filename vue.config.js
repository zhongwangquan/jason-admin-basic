const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 8083

module.exports = {
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://www.flutterweb.cn:3000/mock/49/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src'),
        'views': resolve('src/views'),
        'components': resolve('src/components')
      }
    }
  }

}

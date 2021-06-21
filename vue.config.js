const path = require('path')
const name = 'Vue Typescript Admin'

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  devServer: {
    proxy: {
      "/*": {
        target: "https://orangejuicev2be.herokuapp.com",
        changeOrigin: true,
        ws: true
      }
    }
  },
}

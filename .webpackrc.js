const path = require('path');

export default {
  "proxy": {
    "/admin": {
      "target": "",
      "changeOrigin": true
    }
  },
  "entry": "src/index.js",
  "alias": {
    Components: path.resolve(__dirname, 'src/components/'),
    Utils: path.resolve(__dirname, 'src/utils/'),
    Assets: path.resolve(__dirname, 'src/assets/'),
  },
  "publicPath": "/",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        [ "import", { "libraryName": "antd", "style": "css" } ]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        [ "import", { "libraryName": "antd", "style": "css" } ]
      ]
    }
  }
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('fork-ts-checker');
    // GraphQL Loader
  },
  devServer: {
    disableHostCheck: true,
  },
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      chainWebpackMainProcess: (config) => {
        // Chain webpack config for electron main process only
        config.module
          .rule('wasm')
          .test(/\.node$/)
          .use('node-loader')
          .loader('node-loader')
          .end()
          .rule('wasm')
          .test(/\.wasm$/)
          .use('wasm-loader')
          .loader('wasm-loader')
          .end()
          .rule('rs')
          .test(/\.rs$/)
          .use('rust-native-wasm-loader')
          .loader('rust-native-wasm-loader')
          .end();
      },
      chainWebpackRendererProcess: (config) => {
        // Chain webpack config for electron renderer process only
      },
      // Use this to change the entrypoint of your app's main process
      // mainProcessFile: 'src/myBackgroundFile.js',
      // Provide an array of files that, when changed, will recompile the main process and restart Electron
      // Your main process file will be added by default
      // mainProcessWatch: ['src/myFile1', 'src/myFile2'],
      // Provide a list of arguments that Electron will be launched with during "electron:serve",
      // which can be accessed from the main process (src/background.js).
      // Note that it is ignored when --debug flag is used with "electron:serve", as you must launch Electron yourself
      // Command line args (excluding --debug, --dashboard, and --headless) are passed to Electron as well
      // mainProcessArgs: ['--arg-name', 'arg-value']
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  publicPath: './',
  // chunkFilename: '[name].js',
  configureWebpack: {
    // entry: {
    //   app: [
    //     './src/main.ts'
    //   ]
    // },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\\/]node_modules[\\\/]/,
            priority: -10,
            chunks: 'initial',
            minChunks: 1,
            maxSize: 1000000000000000000,
            minSize: 2000000000,
          },
          common: {
            name: 'common',
            minChunks: 1,
            minSize: 2000000000,
            maxSize: 1000000000000000000,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
};

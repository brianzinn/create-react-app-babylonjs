// used by react-app-rewired

const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: function (config, env) {
    // To let alias like 'react-native/Libraries/Components/StaticRenderer'
    // take effect, must set it before alias 'react-native'
    delete config.resolve.alias['react-native'];
    config.resolve.alias['react-native/Libraries/Components/StaticRenderer'] =
      'react-native-web/dist/vendor/react-native/StaticRenderer';
    config.resolve.alias['react-native'] = path.resolve(
      'web/aliases/react-native',
    );

    // Let's force our code to bundle using the same bundler react native does.
    // config.plugins[3].definitions.__DEV__ = env === 'development';
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: env === 'development',
      }),
    );

    // if meat `BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.` ,
    // then you need some of below, ref to
    // https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      // crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      // assert: require.resolve('assert'),
      // http: require.resolve('stream-http'),
      // https: require.resolve('https-browserify'),
      // os: require.resolve('os-browserify'),
      // url: require.resolve('url')
    });
    config.resolve.fallback = fallback;
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        // Buffer: ['buffer', 'Buffer'],
      })
    );

    if (env === 'production') {
      // ref to node_modules/react-scripts/config/webpack.config.js
      let applicationRule = config.module.rules[1].oneOf[3];

      // with webpack@5 , will cause `BREAKING CHANGE: The request './setPrototypeOf' failed to resolve only
      // because it was resolved as fully specified` if not define below, ref to
      // https://stackoverflow.com/a/69255531/6318705
      applicationRule.resolve = {
        fullySpecified: false,
      };

      // with webpack@5 , will cause `Attempted import error: '@canvas/image-data/index' does not contain a
      // default export (imported as 'ImageData').` if not define below, that's `import ImageData from '@canvas/image-data/index';`
      // in `node_modules/@flyskywhy/react-native-browser-polyfill/src/window.js`
      applicationRule.options.sourceType = 'unambiguous';
    }

    return config;
  },
  paths: function (paths, env) {
    paths.appIndexJs = path.resolve('index.web.js');
    paths.appSrc = path.resolve('.');
    paths.moduleFileExtensions.push('ios.js');
    paths.moduleFileExtensions.push('android.js');
    paths.moduleFileExtensions.push('native.js');
    return paths;
  },
};

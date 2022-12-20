/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts: ['dds', 'txt', 'jpg', 'png'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    blacklistRE: blacklist([
      // to avoid error below when `npm run web-clean` besides `npm run rn` on Windows
      //events.js:174
      //       throw er; // Unhandled 'error' event
      //       ^
      // Error: EPERM: operation not permitted, lstat 'D:\proj\GCanvasRNExamples\node_modules\.cache\default-development'
      // Emitted 'error' event at:
      //     at NodeWatcher.<anonymous> (D:\proj\GCanvasRNExamples\node_modules\sane\src\node_watcher.js:291:16)
      //     at FSReqWrap.oncomplete (fs.js:153:21)
      /node_modules\/\.cache/,
    ]),
  },
};

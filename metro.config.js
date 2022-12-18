/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
  },
};

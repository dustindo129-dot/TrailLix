module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // expo-router/babel is included in babel-preset-expo
      'nativewind/babel',
      // Reanimated plugin (should be listed last)
      'react-native-reanimated/plugin',
    ],
  };
};

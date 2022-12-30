module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], // https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/
  };
};

module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {unstable_disableES6Transforms: true}, // https://github.com/babel/babel/issues/14139#issuecomment-1011836916
    ],
  ],
};

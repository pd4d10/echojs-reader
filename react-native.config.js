// react-native.config.js
// https://github.com/kmagiera/react-native-gesture-handler/issues/671#issuecomment-508903588
module.exports = {
  dependencies: {
    'react-native-gesture-handler': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink
      },
    },
  },
}

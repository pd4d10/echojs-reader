import { Alert } from 'react-native'

export const confirm = (message, callback) => {
  Alert.alert(
    'Confirm',
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: callback },
    ],
    { cancelable: false },
  )
}

export function getHostFromUrl(url) {
  return url.replace(/^.*?\/\//, '').split('/')[0]
}

export function handleError(err) {
  alert(err.message)
}

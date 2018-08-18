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

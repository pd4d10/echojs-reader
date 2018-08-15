import React from 'react'
import { WebView } from 'react-native'
import { MyActivityIndicator } from '../components/icons'

export default class WebScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    }
  }

  render() {
    return (
      <WebView
        source={{ uri: this.props.navigation.getParam('url') }}
        // renderLoading={() => <MyActivityIndicator />}
      />
    )
  }
}

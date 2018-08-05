import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'

export default class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Default title'),
    }
  }

  render() {
    return (
      <View>
        <Text>DetailScreen</Text>
      </View>
    )
  }
}

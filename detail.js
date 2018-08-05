import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'

export default class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    }
  }

  state = {
    comments: [],
  }

  async componentDidMount() {
    const { navigation } = this.props
    const res = await fetch(
      `https://echojs.com/api/getcomments/${navigation.getParam('id')}`,
    )
    const { comments } = await res.json()
    this.setState({ comments })
  }

  render() {
    return (
      <View>
        {this.state.comments.map(comment => (
          <View>
            <Text>{comment.body}</Text>
          </View>
        ))}
      </View>
    )
  }
}

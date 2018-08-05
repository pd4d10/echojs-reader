import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import DetailScreen from './detail'
import { colors } from './utils'

// var SafariView = require('react-native-safari-view')

const PAGE_SIZE = 30

class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Top',
  }

  state = {
    items: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://echojs.com/api/getnews/top/0/${PAGE_SIZE}`,
      )
      const json = await res.json()
      this.setState({
        items: json.news,
      })
    } catch (err) {
      alert(err.message)
    }
  }

  render() {
    return (
      <SafeAreaView>
        {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
        {this.state.items.map(item => (
          <View key={item.id}>
            <Text
              onPress={() => {
                // SafariView.show({
                //   url: 'https://github.com/pd4d10',
                // })
              }}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </SafeAreaView>
    )
  }
}

export default createStackNavigator(
  {
    Top: {
      screen: ListScreen,
    },
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'Top',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    },
  },
)

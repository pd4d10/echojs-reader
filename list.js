import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import SafariView from 'react-native-safari-view'
import DetailScreen from './detail'
import { colors } from './utils'

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

  handleClickLink = async url => {
    const hasSafariView = await SafariView.isAvailable()
    if (hasSafariView) {
      SafariView.show({ url })
    }
  }

  handleClickDiscuss = item => {
    this.props.navigation.navigate('Detail', item)
  }

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <Text>Home Screen</Text>
        {this.state.items.map(item => (
          <View key={item.id}>
            <Text onPress={() => this.handleClickLink(item.url)}>
              {item.title}
            </Text>
            <Text>
              {item.up} up and {item.down} down, posted by {item.username}{' '}
              {item.ctime}
            </Text>
            <View>
              <Text onPress={() => this.handleClickDiscuss(item)}>
                {item.comments} comments
              </Text>
            </View>
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

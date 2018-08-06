import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import distanceInWords from 'date-fns/distance_in_words'
import { createStackNavigator } from 'react-navigation'
import SafariView from 'react-native-safari-view'
import Entypo from 'react-native-vector-icons/Entypo'
import { parse } from 'url'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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

  extractDomain = url => {
    return parse(url).host
  }

  render() {
    const now = Date.now()
    return (
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <StatusBar barStyle="light-content" />
        <View
          style={
            {
              // flex: 1
            }
          }
        >
          {this.state.items.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                borderBottomColor: '#aaa',
                borderBottomWidth: 1,
                padding: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  onPress={() => this.handleClickLink(item.url)}
                  style={{ fontSize: 16, lineHeight: 24, paddingBottom: 6 }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: colors.secondary, fontSize: 13 }}>
                  at {this.extractDomain(item.url)}
                </Text>
                <Text style={{ paddingTop: 4, color: colors.secondary }}>
                  <Text style={{ color: colors.author }}>{item.username}</Text>{' '}
                  | {distanceInWords(parseInt(item.ctime, 10) * 1000, now)} ago
                </Text>
              </View>
              <TouchableOpacity
                style={{ width: 60 }}
                onPress={() => this.handleClickDiscuss(item)}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text>{item.up}</Text>
                  <Entypo name="triangle-up" size={20} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>{item.down}</Text>
                  <Entypo name="triangle-down" size={20} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>{item.comments}</Text>
                  <FontAwesome name="comment-o" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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

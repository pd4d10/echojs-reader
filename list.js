import React from 'react'
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
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

const ListItem = ({ item, onPressComment, time, onPressTitle }) => (
  <View
    style={{
      flexDirection: 'row',
      padding: 12,
    }}
  >
    <View style={{ flex: 1 }}>
      <Text
        onPress={onPressTitle}
        style={{ fontSize: 16, lineHeight: 24, paddingBottom: 6 }}
      >
        {item.title}
      </Text>
      <Text style={{ color: colors.secondary, fontSize: 13 }}>
        at {parse(item.url).host}
      </Text>
      <Text style={{ paddingTop: 4, color: colors.secondary }}>
        <Text style={{ color: colors.author }}>{item.username}</Text> | {time}{' '}
        ago
      </Text>
    </View>
    <TouchableOpacity style={{ width: 60 }} onPress={onPressComment}>
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
)

class ListScreen extends React.Component {
  state = {
    isRefreshing: false,
    isLoadingMore: false,
    items: [],
    isEnd: false,
  }

  fetchData = async (anchor = 0) => {
    const res = await fetch(
      `https://echojs.com/api/getnews/${
        this.props.sort
      }/${anchor}/${PAGE_SIZE}`,
    )
    const json = await res.json()
    return json.news
  }

  componentDidMount() {
    this.handleRefresh()
  }

  handleError = err => {
    alert(err.message)
  }

  handleRefresh = async () => {
    if (this.state.isRefreshing) return

    try {
      this.setState({ isLoading: true })
      const items = await this.fetchData()
      this.setState({
        items,
        isEnd: items.length < PAGE_SIZE,
      })
    } catch (err) {
      this.handleError(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleLoadMore = async () => {
    if (this.state.isLoadingMore || this.state.isEnd) return

    try {
      this.setState({ isLoadingMore: true })
      const items = await this.fetchData(this.state.items.length)
      this.setState(state => ({
        items: [...state.items, ...items],
        isEnd: items.length < PAGE_SIZE,
      }))
    } catch (err) {
      this.handleError(err)
    } finally {
      this.setState({ isLoadingMore: false })
    }
  }

  renderFooter = () => {
    if (this.state.isEnd) {
      return (
        <View>
          <Text>No more data</Text>
        </View>
      )
    } else if (this.state.isLoadingMore) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE',
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    const now = Date.now()

    return (
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <StatusBar barStyle="light-content" />
        <View>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                time={distanceInWords(parseInt(item.ctime, 10) * 1000, now)}
                onPressTitle={async () => {
                  const hasSafariView = await SafariView.isAvailable()
                  if (hasSafariView) {
                    SafariView.show({ url: item.url })
                  }
                }}
                onPressComment={() => {
                  this.props.navigation.navigate('Detail', item)
                }}
              />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: '#CED0CE',
                }}
              />
            )}
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default ListScreen

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
import { Toast } from 'native-base'
import distanceInWords from 'date-fns/distance_in_words'
import SafariView from 'react-native-safari-view'
import { parse } from 'url'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from './utils'

const PAGE_SIZE = 30

class ListItem extends React.PureComponent {
  onPressTitle = async url => {
    const hasSafariView = await SafariView.isAvailable()
    if (hasSafariView) {
      SafariView.show({ url })
    }
  }

  render() {
    const now = Date.now()
    const { item } = this.props

    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            onPress={() => this.onPressTitle(item.url)}
            style={{
              fontSize: 16,
              lineHeight: 22,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 12,
              marginTop: 6,
              marginBottom: 6,
            }}
          >
            at {parse(item.url).host}
          </Text>
          <Text style={{ color: colors.secondary }}>
            <Text style={{ color: colors.author }}>{item.username}</Text> |{' '}
            {distanceInWords(parseInt(item.ctime, 10) * 1000, now)} ago
          </Text>
        </View>
        <View
          style={{ justifyContent: 'space-between', width: 40, marginTop: 2 }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text>▲ {item.up}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>▼ {item.down}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => this.props.navigation.navigate('Detail', item)}
          >
            <FontAwesome
              name="comment-o"
              size={12}
              style={{ marginRight: 3, marginTop: 2 }}
            />
            <Text>{item.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class ListScreen extends React.Component {
  state = {
    isFirstTimeLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    items: [],
    isEnd: false,
  }

  fetchData = async (anchor = 0) => {
    // For slow network testing
    // await new Promise(resolve => {
    //   setTimeout(resolve, 3000)
    // })
    const res = await fetch(
      `https://echojs.com/api/getnews/${
        this.props.sort
      }/${anchor}/${PAGE_SIZE}`,
    )
    const json = await res.json()
    return json.news
  }

  componentDidMount() {
    this.handleFirstTimeFetch()
  }

  handleError = err => {
    alert(err.message)
  }

  handleFirstTimeFetch = async () => {
    try {
      this.setState({ isFirstTimeLoading: true })
      const items = await this.fetchData()
      this.setState({
        items,
        isEnd: items.length < PAGE_SIZE,
      })
    } catch (err) {
      this.handleError(err)
    } finally {
      this.setState({ isFirstTimeLoading: false })
    }
  }

  handleRefresh = async () => {
    if (this.state.isRefreshing) return

    try {
      this.setState({ isRefreshing: true })
      const items = await this.fetchData()
      this.setState({
        items,
        isEnd: items.length < PAGE_SIZE,
      })
      Toast.show({
        text: 'Refresh success',
        position: 'top',
        duration: 2000,
      })
    } catch (err) {
      this.handleError(err)
    } finally {
      this.setState({ isRefreshing: false })
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

  renderFooter = () => (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
      }}
    >
      {this.state.isLoadingMore ? (
        <ActivityIndicator />
      ) : this.state.isEnd ? (
        <Text>--- No more data ---</Text>
      ) : null}
    </View>
  )

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <StatusBar barStyle="light-content" />
        {this.state.isFirstTimeLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <ListItem item={item} navigation={this.props.navigation} />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.border,
                }}
              />
            )}
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
          />
        )}
      </SafeAreaView>
    )
  }
}

export class TopScreen extends React.Component {
  static navigationOptions = {
    title: 'Top news',
  }
  render() {
    return <ListScreen {...this.props} sort="top" />
  }
}

export class LatestScreen extends React.Component {
  static navigationOptions = {
    title: 'Latest news',
  }
  render() {
    return <ListScreen {...this.props} sort="latest" />
  }
}

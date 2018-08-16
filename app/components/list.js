import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { MyActivityIndicator } from '../components/icons'
import { ThemeConsumer } from '../context'
import PostItem from '../components/post'

const PAGE_SIZE = 30

export default class List extends React.Component {
  state = {
    isFirstTimeLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    items: [],
    isEnd: false,
  }

  fetchData = async (anchor = 0) => {
    // For slow network testing
    const json = await new Promise(resolve => {
      setTimeout(() => resolve(require('../../mock')), 1000)
    })
    // const res = await fetch(
    //   `https://echojs.com/api/getnews/${
    //     this.props.sort
    //   }/${anchor}/${PAGE_SIZE}`,
    // )
    // const json = await res.json()
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
      // Toast.show({
      //   text: 'Refresh success',
      //   position: 'top',
      //   duration: 2000,
      // })
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

  render() {
    return (
      <ThemeConsumer>
        {({ colors }) => (
          <View
            style={{
              backgroundColor: colors.content.background,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {this.state.isFirstTimeLoading ? (
              <MyActivityIndicator size="large" />
            ) : (
              <FlatList
                data={this.state.items}
                renderItem={({ item }) => (
                  <PostItem
                    item={item}
                    navigation={this.props.navigation}
                    colors={colors}
                  />
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.content.border,
                    }}
                  />
                )}
                refreshing={this.state.isRefreshing}
                onRefresh={this.handleRefresh}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (
                  <View
                    style={{
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderColor: colors.content.border,
                      alignItems: 'center',
                    }}
                  >
                    {this.state.isLoadingMore ? (
                      <MyActivityIndicator />
                    ) : this.state.isEnd ? (
                      <Text>--- No more data ---</Text>
                    ) : null}
                  </View>
                )}
              />
            )}
          </View>
        )}
      </ThemeConsumer>
    )
  }
}

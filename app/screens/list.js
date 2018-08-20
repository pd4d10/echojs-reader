import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { ThemeConsumer, AuthConsumer } from '../context'
import { MyActivityIndicator } from '../components/icons'
import PostItem from '../components/post'

const PAGE_SIZE = 30

class List extends React.Component {
  state = {
    isFirstTimeLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    items: [],
    isEnd: false,
  }

  componentDidMount() {
    this.handleFirstTimeFetch()
  }

  handleError = err => {
    alert(err.message)
  }

  updateVote = (id, type) => {
    this.setState(({ items }) => ({
      items: items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            voted: type,
            up: type === 'up' ? parseInt(item.up, 10) + 1 : item.up,
            down: type === 'down' ? parseInt(item.down, 10) + 1 : item.down,
          }
        } else {
          return item
        }
      }),
    }))
  }

  fetchData = (anchor = 0) => {
    return this.props.getNews(this.props.sort, anchor, PAGE_SIZE)
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
    const { colors, voteNews, auth } = this.props
    return (
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
                voteNews={voteNews}
                updateVote={this.updateVote}
                auth={auth}
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
                  height: 56,
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
    )
  }
}

const ListWithProps = props => (
  <ThemeConsumer>
    {({ colors }) => (
      <AuthConsumer>
        {({ getNews, voteNews, auth }) => (
          <List {...{ colors, getNews, voteNews, auth, ...props }} />
        )}
      </AuthConsumer>
    )}
  </ThemeConsumer>
)

export const TopScreen = props => <ListWithProps sort="top" {...props} />

export const LatestScreen = props => <ListWithProps sort="latest" {...props} />

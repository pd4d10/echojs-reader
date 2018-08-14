import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import distanceInWords from 'date-fns/distance_in_words'
import { ListItem } from './list'
import { MyActivityIndicator } from './utils'
import { ThemeContext } from './App'

class CommentItem extends React.PureComponent {
  static defaultProps = {
    level: 0,
  }

  render() {
    const now = Date.now()
    const { item, colors } = this.props
    return (
      <React.Fragment>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            marginLeft: this.props.level * 20,
            // borderTopColor: colors.border,
            // borderTopWidth: this.props.index === 0 ? 0 : 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.secondaryText, marginBottom: 4 }}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                }}
              >
                {item.username}
              </Text>{' '}
              | {distanceInWords(parseInt(item.ctime, 10) * 1000, now)} ago
            </Text>
            <Text style={{ color: colors.primaryText }}>{item.body}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              width: 44,
              marginTop: 2,
              paddingLeft: 10,
            }}
          >
            <View>
              <Text style={{ color: colors.secondaryText }}>▲ {item.up}</Text>
              <Text style={{ color: colors.secondaryText }}>
                ▼ {item.down | 0}
              </Text>
            </View>
          </View>
        </View>
        {(item.replies || []).map(reply => (
          <CommentItem
            key={reply.ctime + reply.username}
            level={this.props.level + 1}
            item={reply}
            colors={colors}
          />
        ))}
      </React.Fragment>
    )
  }
}

export default class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    }
  }

  state = {
    isLoading: false,
    comments: [],
  }

  async componentDidMount() {
    const { navigation } = this.props
    const id = navigation.getParam('id')
    // const id = 17367
    try {
      this.setState({
        isLoading: true,
      })
      const res = await fetch(`https://echojs.com/api/getcomments/${id}`)
      const json = await res.json()
      this.setState({
        comments: json.comments.sort((a, b) => a.ctime - b.ctime),
      })
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ colors }) => (
          <ScrollView
            style={{
              backgroundColor: colors.background,
              padding: 4,
              // flex: 1,
              // justifyContent: 'center',
            }}
          >
            <ListItem
              item={this.props.navigation.state.params}
              hasCommentLink={false}
              colors={colors}
            />
            <View
              style={{
                borderBottomColor: colors.border,
                borderBottomWidth: 8,
              }}
            />
            {this.state.isLoading ? (
              <MyActivityIndicator style={{ marginTop: 10 }} />
            ) : (
              this.state.comments.map((comment, index) => (
                <CommentItem
                  key={comment.ctime + comment.username}
                  item={comment}
                  colors={colors}
                />
              ))
            )}
          </ScrollView>
        )}
      </ThemeContext.Consumer>
    )
  }
}

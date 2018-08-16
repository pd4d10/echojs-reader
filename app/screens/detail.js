import React from 'react'
import { View, ScrollView } from 'react-native'
import { MyActivityIndicator } from '../components/icons'
import { ThemeConsumer } from '../context'
import PostItem from '../components/post'
import CommentItem from '../components/comment'

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
      <ThemeConsumer>
        {({ colors }) => (
          <ScrollView
            style={{
              backgroundColor: colors.content.background,
              padding: 4,
            }}
          >
            <PostItem
              item={this.props.navigation.state.params}
              hasCommentLink={false}
              colors={colors}
            />
            <View
              style={{
                borderBottomColor: colors.content.border,
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
      </ThemeConsumer>
    )
  }
}

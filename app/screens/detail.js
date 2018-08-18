import React from 'react'
import { View, ScrollView } from 'react-native'
import { MyActivityIndicator } from '../components/icons'
import { ThemeConsumer, AuthConsumer } from '../context'
import PostItem from '../components/post'
import CommentItem from '../components/comment'

class Detail extends React.Component {
  state = {
    isLoading: false,
    comments: [],
  }

  async componentDidMount() {
    // const id = this.props.navigation.getParam('id')
    const id = 22273
    try {
      this.setState({
        isLoading: true,
      })
      const comments = await this.props.getComments(id)
      this.setState({ comments })
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const { colors, voteNews, auth } = this.props
    return (
      <ScrollView
        style={{
          backgroundColor: colors.content.background,
          padding: 4,
        }}
      >
        <PostItem
          item={this.props.navigation.state.params}
          hasCommentLink={false}
          navigation={this.props.navigation}
          colors={colors}
          voteNews={voteNews}
          auth={auth}
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
    )
  }
}

export const DetailScreen = props => (
  <AuthConsumer>
    {({ getComments, voteNews, auth }) => (
      <ThemeConsumer>
        {({ colors }) => (
          <Detail {...{ colors, getComments, voteNews, auth }} {...props} />
        )}
      </ThemeConsumer>
    )}
  </AuthConsumer>
)

DetailScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
})

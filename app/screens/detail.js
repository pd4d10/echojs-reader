import React from 'react'
import { View, ScrollView } from 'react-native'
import { MyActivityIndicator } from '../components/icons'
import { ThemeContext, AuthContext } from '../context'
import { PostItem } from '../components/post'
import { CommentItem } from '../components/comment'
import { handleError } from '../utils'

export const DetailScreen = ({ navigation }) => {
  const { colors } = React.useContext(ThemeContext)
  const { fetchWithAuth } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)
  const [comments, setComments] = React.useState([])

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const id = navigation.getParam('id')
        // const id = 22273
        const json = await fetchWithAuth(`/getcomments/${id}`)
        setComments(json.comments.sort((a, b) => a.ctime - b.ctime)) // Sort by time
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <ScrollView
      style={{
        backgroundColor: colors.content.background,
        padding: 4,
      }}
    >
      <PostItem
        item={navigation.state.params}
        hasCommentLink={false}
        navigation={navigation}
      />
      <View
        style={{
          borderBottomColor: colors.content.border,
          borderBottomWidth: 8,
        }}
      />
      {loading ? (
        <MyActivityIndicator style={{ marginTop: 10 }} />
      ) : (
        comments.map(comment => (
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

DetailScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
})

import React from 'react'
import { Text, View, TouchableOpacity, Alert, Platform } from 'react-native'
import distanceInWords from 'date-fns/distance_in_words'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ActionSheet from 'react-native-actionsheet'
import { SettingsContext } from '../context'
import { Vote } from './vote'
import { getHostFromUrl } from '../utils'

export const PostItem = props => {
  const [actionSheet, setActionSheet] = React.useState(null)

  const isText = React.useCallback(() => {
    return props.item.url.startsWith('text://')
  }, [props.item])

  const now = Date.now()
  const { item, hasCommentLink = true, colors } = props
  const { openLink } = React.useContext(SettingsContext)

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={async () => {
            if (isText()) {
              props.navigation.navigate('Detail', item)
              return
            }

            openLink(item.url, colors)
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 22,
              color: colors.content.title,
              marginBottom: 6,
            }}
          >
            {item.title}
          </Text>
          {isText() || (
            <Text
              style={{
                color: colors.content.url,
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              at {getHostFromUrl(item.url)}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={{ color: colors.content.user, fontSize: 14 }}>
          <Text
            style={{
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              openLink(`https://echojs.com/user/${item.username}`, colors)
            }}
          >
            {item.username}
          </Text>{' '}
          | {distanceInWords(parseInt(item.ctime, 10) * 1000, now)} ago
        </Text>
      </View>

      {hasCommentLink && (
        <View
          style={{
            justifyContent: 'space-between',
            width: 44,
            marginTop: 2,
            paddingLeft: 10,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              if (!props.auth) {
                props.navigation.navigate('Login')
                return
              }

              if (item.voted) {
                alert(`You already vote ${item.voted}`)
                return
              }

              actionSheet.show()
            }}
          >
            <Vote colors={colors} item={item} />
            <ActionSheet
              ref={el => {
                setActionSheet(el)
              }}
              title={`Vote for ${item.username}'s post`}
              options={['Up', 'Down', 'cancel']}
              cancelButtonIndex={2}
              onPress={async index => {
                try {
                  switch (index) {
                    case 0:
                      await props.voteNews(item.id, 'up')
                      props.updateVote(item.id, 'up')
                    case 1:
                      await props.voteNews(item.id, 'down')
                      props.updateVote(item.id, 'down')
                  }
                } catch (err) {
                  alert(err.message)
                }
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'flex-end' }}
            onPress={() => props.navigation.navigate('Detail', { ...item })}
          >
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={14}
                style={Platform.select({
                  ios: { marginRight: 2, marginTop: 2 },
                  android: { marginRight: 3, marginTop: 3 },
                })}
                color={colors.content.icon}
              />
              <Text style={{ color: colors.content.icon }}>
                {item.comments}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

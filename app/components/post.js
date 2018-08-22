import React from 'react'
import { Text, View, TouchableOpacity, Alert, Platform } from 'react-native'
import distanceInWords from 'date-fns/distance_in_words'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SettingsConsumer } from '../context'
import { Vote } from './vote'
import { getHostFromUrl } from '../utils'

export default class PostItem extends React.PureComponent {
  static defaultProps = {
    hasCommentLink: true,
  }

  isText = () => {
    return this.props.item.url.startsWith('text://')
  }

  render() {
    const now = Date.now()
    const { item, hasCommentLink, colors } = this.props

    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <SettingsConsumer>
            {({ openLink }) => (
              <TouchableOpacity
                onPress={async () => {
                  if (this.isText()) {
                    this.props.navigation.navigate('Detail', item)
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
                {this.isText() || (
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
            )}
          </SettingsConsumer>
          <Text style={{ color: colors.content.user, fontSize: 14 }}>
            <Text
              style={{
                textDecorationLine: 'underline',
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
                if (!this.props.auth) {
                  this.props.navigation.navigate('Login')
                  return
                }

                if (item.voted) {
                  alert(`You already vote ${item.voted}`)
                  return
                }

                Alert.alert(
                  `Vote for ${item.username}'s post`,
                  item.title,
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Up',
                      onPress: async () => {
                        try {
                          await this.props.voteNews(item.id, 'up')
                          this.props.updateVote(item.id, 'up')
                        } catch (err) {
                          alert(err.message)
                        }
                      },
                    },
                    {
                      text: 'Down',
                      onPress: async () => {
                        try {
                          await this.props.voteNews(item.id, 'down')
                          this.props.updateVote(item.id, 'down')
                        } catch (err) {
                          alert(err.message)
                        }
                      },
                    },
                  ],
                  { cancelable: true },
                )
              }}
            >
              <Vote colors={colors} item={item} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'flex-end' }}
              onPress={() =>
                this.props.navigation.navigate('Detail', { ...item })
              }
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
}

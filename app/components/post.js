import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import distanceInWords from 'date-fns/distance_in_words'
import { parse } from 'url'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SettingsConsumer } from '../context'

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

                  openLink(item.url, colors, () => {
                    this.props.navigation.navigate('WebView', item)
                  })
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
                    at {parse(item.url).host}
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
        <View
          style={{
            justifyContent: 'space-between',
            width: 44,
            marginTop: 2,
            paddingLeft: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.content.icon }}>▲ {item.up}</Text>
            <Text style={{ color: colors.content.icon }}>▼ {item.down}</Text>
          </View>
          {hasCommentLink && (
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'flex-end' }}
              onPress={() => this.props.navigation.navigate('Detail', item)}
            >
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                  name="comment-processing-outline"
                  size={14}
                  style={{ marginRight: 2, marginTop: 3 }}
                  color={colors.content.icon}
                />
                <Text style={{ color: colors.content.icon }}>
                  {item.comments}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

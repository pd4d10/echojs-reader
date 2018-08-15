import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import distanceInWords from 'date-fns/distance_in_words'
import SafariView from 'react-native-safari-view'
import { parse } from 'url'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { openUrl } from '../utils'

export default class PostItem extends React.PureComponent {
  static defaultProps = {
    hasCommentLink: true,
  }

  isText = () => {
    return this.props.item.url.startsWith('text://')
  }

  onPressTitle = async item => {
    if (this.isText()) {
      this.props.navigation.navigate('Detail', item)
      return
    }

    this.props.navigation.navigate('Web', item)

    // openUrl(item.url)
    // if (await this.isSafariViewAvailable()) {
    //   SafariView.show({
    //     url: item.url,
    //     tintColor: this.props.colors.primary,
    //     // barTintColor: this.props.colors.content.background,
    //   })
    // } else {
    // }
  }

  isSafariViewAvailable = async () => {
    try {
      return await SafariView.isAvailable()
    } catch (err) {
      return false
    }
  }

  setStatusBarToDark = () => {
    // StatusBar.setBarStyle('dark-content')
  }

  setStatusBarToLight = () => {
    // StatusBar.setBarStyle('light-content')
  }

  async componentDidMount() {
    if (await this.isSafariViewAvailable()) {
      SafariView.addEventListener('onShow', this.setStatusBarToDark)
      SafariView.addEventListener('onDismiss', this.setStatusBarToLight)
    }
  }

  async componentWillUnmount() {
    if (await this.isSafariViewAvailable()) {
      SafariView.removeEventListener('onShow', this.setStatusBarToDark)
      SafariView.removeEventListener('onDismiss', this.setStatusBarToLight)
    }
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
          <TouchableOpacity onPress={() => this.onPressTitle(item)}>
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
          <View>
            <Text style={{ color: colors.content.icon }}>▲ {item.up}</Text>
            <Text style={{ color: colors.content.icon }}>▼ {item.down}</Text>
          </View>
          {hasCommentLink && (
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => this.props.navigation.navigate('Detail', item)}
            >
              <MaterialCommunityIcons
                name="comment-processing-outline"
                size={14}
                style={{ marginRight: 2, marginTop: 3 }}
                color={colors.content.icon}
              />
              <Text style={{ color: colors.content.icon }}>
                {item.comments}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

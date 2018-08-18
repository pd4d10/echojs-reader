import React from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import distanceInWords from 'date-fns/distance_in_words'
import { Vote } from './vote'

export default class CommentItem extends React.PureComponent {
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
            // borderTopColor: colors.content.border,
            // borderTopWidth: this.props.index === 0 ? 0 : 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.content.user, marginBottom: 4 }}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                }}
              >
                {item.username}
              </Text>{' '}
              | {distanceInWords(parseInt(item.ctime, 10) * 1000, now)} ago
            </Text>
            <Text style={{ color: colors.content.title }}>{item.body}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              width: 44,
              marginTop: 2,
              paddingLeft: 10,
            }}
          >
            <Vote colors={colors} item={item} />
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

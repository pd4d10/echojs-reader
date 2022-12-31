import React from "react";
import { Text, View } from "react-native";
import { formatDistance } from "date-fns";
import { Vote } from "./vote";
import { Nickname } from "./nickname";

export const CommentItem = ({ item, colors, level = 0 }) => {
  const now = Date.now();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          marginLeft: level * 20,
          // borderTopColor: colors.content.border,
          // borderTopWidth: this.props.index === 0 ? 0 : 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.content.user, marginBottom: 4 }}>
            <Nickname name={item.username} /> |{" "}
            {formatDistance(parseInt(item.ctime, 10) * 1000, now)} ago
          </Text>
          <Text style={{ color: colors.content.title }}>{item.body}</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            width: 44,
            marginTop: 2,
            paddingLeft: 10,
          }}
        >
          <Vote colors={colors} item={item} />
        </View>
      </View>
      {(item.replies || []).map((reply) => (
        <CommentItem
          key={reply.ctime + reply.username}
          level={level + 1}
          item={reply}
          colors={colors}
        />
      ))}
    </>
  );
};

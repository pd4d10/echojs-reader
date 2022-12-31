import React from "react";
import { Text, View } from "react-native";

export const Vote = ({ colors, item }) => (
  <View>
    <Text
      style={{
        color: item.voted === "up" ? colors.contentVoted : colors.contentIcon,
      }}
    >
      ▲ {item.up}
    </Text>
    <Text
      style={{
        color: item.voted === "down" ? colors.contentVoted : colors.contentIcon,
      }}
    >
      ▼ {item.down || 0}
    </Text>
  </View>
);

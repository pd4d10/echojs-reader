import React from "react";
import { Text, View } from "react-native";

export const Vote = ({ colors, item }) => (
  <View>
    <Text
      style={{
        color: item.voted === "up" ? colors.content.voted : colors.content.icon,
      }}
    >
      ▲ {item.up}
    </Text>
    <Text
      style={{
        color:
          item.voted === "down" ? colors.content.voted : colors.content.icon,
      }}
    >
      ▼ {item.down || 0}
    </Text>
  </View>
);

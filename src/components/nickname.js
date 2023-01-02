import React from "react";
import { Text } from "react-native";
import { openLink } from "../utils";

export const Nickname = ({ name }) => {
  return (
    <Text
      style={{
        textDecorationLine: "underline",
      }}
      onPress={() => {
        openLink(`https://echojs.com/user/${name}`);
      }}
    >
      {name}
    </Text>
  );
};

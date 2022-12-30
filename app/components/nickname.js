import React from "react";
import { Text } from "react-native";
import { SettingsContext } from "../context/settings";
import { ThemeContext } from "../context/theme";

export const Nickname = ({ name }) => {
  const { openLink } = React.useContext(SettingsContext);
  const { colors } = React.useContext(ThemeContext);

  return (
    <Text
      style={{
        textDecorationLine: "underline",
      }}
      onPress={() => {
        openLink(`https://echojs.com/user/${name}`, colors);
      }}
    >
      {name}
    </Text>
  );
};

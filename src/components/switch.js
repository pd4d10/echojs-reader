import React from "react";
import { Switch, Platform } from "react-native";
import { context as ThemeContext } from "../ThemeContext.bs";

export default function CustomSwitch({ ...props }) {
  const { colors } = React.useContext(ThemeContext);

  return (
    <Switch
      {...Platform.select({
        ios: {
          trackColor: {
            true: colors.settingsActive,
          },
        },
        android: {
          trackColor: {
            true: colors.settingsAndroidSwitchActiveBackground,
          },
          thumbColor: colors.settingsActive,
        },
      })}
      {...props}
    />
  );
}

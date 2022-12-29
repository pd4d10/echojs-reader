import React from "react";
import { Switch, Platform } from "react-native";
import { ThemeContext } from "../context";

export default function CustomSwitch({ ...props }) {
  const { colors } = React.useContext(ThemeContext);

  return (
    <Switch
      {...Platform.select({
        ios: {
          trackColor: {
            true: colors.settings.active
          }
        },
        android: {
          trackColor: {
            true: colors.settings.androidSwitchActiveBackground
          },
          thumbColor: colors.settings.active
        }
      })}
      {...props}
    />
  );
}

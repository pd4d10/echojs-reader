import React from "react";
import { ActivityIndicator, Platform } from "react-native";

import { ThemeContext } from "../context/theme";

// Use primary color at Android
export const MyActivityIndicator = (props) => {
  const { colors } = React.useContext(ThemeContext);
  return (
    <ActivityIndicator
      color={Platform.select({ android: colors.content.loading })}
      {...props}
    />
  );
};

import React from "react";
import { ActivityIndicator, Platform } from "react-native";

import { context as ThemeContext } from "../ThemeContext.bs";

// Use primary color at Android
export const MyActivityIndicator = (props) => {
  const { colors } = React.useContext(ThemeContext);
  return (
    <ActivityIndicator
      color={Platform.select({ android: colors.contentLoading })}
      {...props}
    />
  );
};

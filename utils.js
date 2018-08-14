import React from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { ThemeContext } from './App'

// Use primary color at Android
export const MyActivityIndicator = props => (
  <ThemeContext.Consumer>
    {({ colors }) => (
      <ActivityIndicator
        color={Platform.OS === 'android' ? colors.content.loading : undefined}
        {...props}
      />
    )}
  </ThemeContext.Consumer>
)

import React from 'react'
import { ActivityIndicator, Platform } from 'react-native'

// Use primary color at Android
export const MyActivityIndicator = props => (
  <ActivityIndicator
    color={Platform.OS === 'android' ? colors.primary : undefined}
    {...props}
  />
)

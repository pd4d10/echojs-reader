import React from 'react'
import { ActivityIndicator, Platform } from 'react-native'

export const colors = {
  primary: '#af1d1d',
  border: '#ccc',
  background: '#fff',

  primaryText: '#000',
  secondaryText: '#666',
  greyText: '#999',
}

// Use primary color at Android
export const MyActivityIndicator = props => (
  <ActivityIndicator
    color={Platform.OS === 'android' ? colors.primary : undefined}
    {...props}
  />
)

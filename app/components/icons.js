import React from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ThemeConsumer } from '../context'

export const TopIcon = props => <Entypo name="bar-graph" {...props} />

export const LatestIcon = props => <Ionicons name="md-time" {...props} />

export const SettingsIcon = props => (
  <MaterialIcons name="settings" {...props} />
)

// Use primary color at Android
export const MyActivityIndicator = props => (
  <ThemeConsumer>
    {({ colors }) => (
      <ActivityIndicator
        color={Platform.select({ android: colors.content.loading })}
        {...props}
      />
    )}
  </ThemeConsumer>
)

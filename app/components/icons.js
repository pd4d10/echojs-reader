import React from 'react'
import { ActivityIndicator } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ThemeContext } from '../context'
import { isAndroid } from '../utils'

export const TopIcon = props => <Entypo name="bar-graph" {...props} />

export const LatestIcon = props => <Ionicons name="md-time" {...props} />

export const SettingsIcon = props => (
  <MaterialIcons name="settings" {...props} />
)

// Use primary color at Android
export const MyActivityIndicator = props => (
  <ThemeContext.Consumer>
    {({ colors }) => (
      <ActivityIndicator
        color={isAndroid ? colors.content.loading : undefined}
        {...props}
      />
    )}
  </ThemeContext.Consumer>
)

import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const TopIcon = props => (
  <MaterialCommunityIcons name="chart-line" {...props} />
)

export const LatestIcon = props => <Ionicons name="md-time" {...props} />

export const SettingsIcon = props => (
  <MaterialIcons name="settings" {...props} />
)

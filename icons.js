import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const TopIcon = props => <Entypo name="bar-graph" {...props} />

export const LatestIcon = props => <Ionicons name="md-time" {...props} />

export const SettingsIcon = props => (
  <MaterialIcons name="settings" {...props} />
)

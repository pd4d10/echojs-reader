import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import {
  createTopNavigator,
  createLatestNavigator,
  createSettingsNavigator,
} from './stack'
// import { LatestIcon, SettingsIcon, TopIcon } from '../components/icons'

export default ({ colors }) =>
  createDrawerNavigator(
    {
      Top: createTopNavigator({
        colors,
        hasDrawer: true,
      }),
      Latest: createLatestNavigator({
        colors,
        hasDrawer: true,
      }),
      Settings: createSettingsNavigator({
        colors,
        hasDrawer: true,
      }),
    },
    {
      contentOptions: {
        activeTintColor: colors.drawer.active,
        inactiveTintColor: colors.drawer.inactive,
      },
    },
  )

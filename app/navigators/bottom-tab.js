import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import {
  createTopNavigator,
  createLatestNavigator,
  createSettingsNavigator,
} from './stack'
import { TopIcon, LatestIcon, SettingsIcon } from '../components/icons'

export default ({ colors }) =>
  createBottomTabNavigator(
    {
      Top: createTopNavigator({ colors }),
      Latest: createLatestNavigator({ colors }),
      Settings: createSettingsNavigator({ colors }),
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
          const props = {
            color: focused ? colors.tab.active : colors.tab.inactive, // TODO:
            size: 24,
          }

          switch (navigation.state.routeName) {
            case 'Top':
              return <TopIcon {...props} />
            case 'Latest':
              return <LatestIcon {...props} />
            case 'Settings':
              return <SettingsIcon {...props} />
          }
        },
      }),
      tabBarOptions: {
        activeTintColor: colors.tab.active,
        inactiveTintColor: colors.tab.inactive,
      },
    },
  )

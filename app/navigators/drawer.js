import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './screens'
import { LatestIcon, SettingsIcon, TopIcon } from '../components/icons'
import { ThemeContext } from '../context'

const CustomDrawer = props => (
  <ScrollView>
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ThemeContext.Consumer>
        {({ colors }) => (
          <DrawerItems
            {...props}
            activeTintColor={colors.drawer.active}
            inactiveTintColor={colors.drawer.inactive}
            // activeTintColor: '#2196f3',
            // activeBackgroundColor: 'rgba(0, 0, 0, .04)',
            // inactiveTintColor: 'rgba(0, 0, 0, .87)',
            // inactiveBackgroundColor: 'transparent',
            renderIcon={({ tintColor, route }) => {
              const iconProps = { color: tintColor, size: 24 }
              switch (route.routeName) {
                case 'Settings':
                  return <SettingsIcon {...iconProps} />
                case 'Latest':
                  return <LatestIcon {...iconProps} />
                case 'Top':
                  return <TopIcon {...iconProps} />
              }
            }}
          />
        )}
      </ThemeContext.Consumer>
    </SafeAreaView>
  </ScrollView>
)

export default createDrawerNavigator(
  {
    Top: TopNavigator,
    Latest: LatestNavigator,
    Settings: SettingsNavigator,
  },
  {
    contentComponent: CustomDrawer,
  },
)

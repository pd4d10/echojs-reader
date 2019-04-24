import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './stack'
import { LatestIcon, SettingsIcon, TopIcon } from '../components/icons'
import { ThemeConsumer } from '../context'

const CustomDrawer = props => (
  <ScrollView>
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ThemeConsumer>
        {({ colors }) => (
          <DrawerItems
            {...props}
            activeTintColor={colors.drawer.active}
            inactiveTintColor={colors.drawer.inactive}
            activeBackgroundColor={colors.drawer.activeBackground}
            inactiveBackgroundColor={colors.drawer.inactiveBackground}
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
      </ThemeConsumer>
    </SafeAreaView>
  </ScrollView>
)

export const DrawerNavigator = createAppContainer(
  createDrawerNavigator(
    {
      Top: TopNavigator,
      Latest: LatestNavigator,
      Settings: SettingsNavigator,
    },
    {
      contentComponent: CustomDrawer,
    },
  ),
)

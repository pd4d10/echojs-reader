import React from 'react'
import BottomNavigation from 'react-native-paper/src/components/BottomNavigation'
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createTabNavigator } from 'react-navigation-tabs'
import { TopIcon, LatestIcon, SettingsIcon } from '../components/icons'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './stack'
import { ThemeConsumer } from '../context'

class BottomNavigationView extends React.Component {
  _getColor = ({ route }) => {
    const { descriptors } = this.props
    const descriptor = descriptors[route.key]
    const options = descriptor.options

    return options.tabBarColor
  }

  _isVisible() {
    const { navigation, descriptors } = this.props
    const { state } = navigation
    const route = state.routes[state.index]
    const options = descriptors[route.key].options
    return options.tabBarVisible
  }

  render() {
    const {
      activeTintColor,
      inactiveTintColor,
      navigation,
      // eslint-disable-next-line no-unused-vars
      descriptors,
      barStyle,
      ...rest
    } = this.props

    const isVisible = this._isVisible()
    const extraStyle =
      typeof isVisible === 'boolean'
        ? { display: isVisible ? null : 'none' }
        : null

    return (
      <ThemeConsumer>
        {({ colors }) => (
          <BottomNavigation
            // Pass these for backward compaibility
            activeColor={colors.tab.active}
            inactiveColor={colors.tab.inactive}
            {...rest}
            renderIcon={({ route, focused }) => {
              const props = {
                color: focused ? colors.tab.active : colors.tab.inactive,
                size: 24,
              }

              switch (route.routeName) {
                case 'Top':
                  return <TopIcon {...props} />
                case 'Latest':
                  return <LatestIcon {...props} />
                case 'Settings':
                  return <SettingsIcon {...props} />
              }
            }}
            barStyle={[barStyle, extraStyle]}
            navigationState={navigation.state}
            getColor={this._getColor}
          />
        )}
      </ThemeConsumer>
    )
  }
}

export const MaterialBottomTabNavigator = createTabNavigator(
  BottomNavigationView,
)(
  {
    Top: TopNavigator,
    Latest: LatestNavigator,
    Settings: SettingsNavigator,
  },
  {
    barStyle: { backgroundColor: '#fff' },
  },
)

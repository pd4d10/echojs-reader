import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DetailScreen from '../screens/detail'
import ListScreen from '../screens/list'
import Settings from '../screens/settings'

const createNavigatorFactory = (routeConfigMap, title) => ({
  colors,
  hasDrawer,
}) => {
  return createStackNavigator(routeConfigMap, {
    navigationOptions: ({ navigation }) => ({
      title,
      headerTintColor: colors.header.text,
      headerStyle: {
        backgroundColor: colors.header.background,
      },
      headerLeft: hasDrawer ? (
        <MaterialIcons
          name="menu"
          size={24}
          color={colors.header.text}
          style={{ paddingLeft: 16 }}
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ) : (
        undefined
      ),
    }),
  })
}

export const createTopNavigator = createNavigatorFactory(
  {
    Top: props => <ListScreen {...props} sort="top" />,
    Detail: DetailScreen,
  },
  'Top news',
)

export const createLatestNavigator = createNavigatorFactory(
  {
    Latest: props => <ListScreen {...props} sort="latest" />,
    Detail: DetailScreen,
  },
  'Latest news',
)

export const createSettingsNavigator = createNavigatorFactory(
  {
    Settings: Settings,
  },
  'Settings',
)

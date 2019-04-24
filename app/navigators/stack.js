import React from 'react'
import { createStackNavigator, Header } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  TopScreen,
  LatestScreen,
  DetailScreen,
  SettingsScreen,
} from '../screens'
import { ThemeConsumer, LayoutContext } from '../context'
import { LoginScreen } from '../screens/login'

// HACK: This is a hack to dynamic change header's style
const CustomHeader = props => {
  // const { layout } = React.useContext(LayoutContext)
  const layout = '' // FIXME:

  return (
    <ThemeConsumer>
      {({ colors }) => {
        let headerLeft
        if (props.scene.index === 0 && layout === 'drawer') {
          headerLeft = (
            <MaterialIcons
              name="menu"
              size={24}
              color={colors.header.text}
              style={{ paddingLeft: 16 }}
              onPress={() => {
                props.scene.descriptor.navigation.openDrawer()
              }}
            />
          )
        } else {
          // Keep headerLeft to undefined so it will use HeaderBackButton
          // https://github.com/react-navigation/react-navigation-stack/blob/master/src/views/Header/Header.js#L202
        }

        const addOptionsToScene = scene => ({
          ...scene,
          descriptor: {
            ...scene.descriptor,
            options: {
              ...scene.descriptor.options,
              headerTintColor: colors.header.text,
              headerStyle: {
                backgroundColor: colors.header.background,
              },
              headerLeft,
            },
          },
        })

        const propsNew = {
          ...props,
          scene: addOptionsToScene(props.scene),
          scenes: props.scenes.map(addOptionsToScene),
        }

        // console.log(propsNew.scenes)
        return <Header {...propsNew} />
      }}
    </ThemeConsumer>
  )
}

export const TopNavigator = createStackNavigator(
  {
    Top: TopScreen,
    Detail: DetailScreen,
    Login: LoginScreen,
  },
  {
    defaultNavigationOptions: {
      title: 'Top news',
      header: CustomHeader,
    },
  },
)

export const LatestNavigator = createStackNavigator(
  {
    Latest: LatestScreen,
    Detail: DetailScreen,
    Login: LoginScreen,
  },
  {
    defaultNavigationOptions: {
      title: 'Latest news',
      header: CustomHeader,
    },
  },
)

export const SettingsNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    Login: LoginScreen,
  },
  {
    defaultNavigationOptions: {
      title: 'Settings',
      header: CustomHeader,
    },
  },
)

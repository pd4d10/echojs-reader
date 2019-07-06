import React from 'react'
import { createStackNavigator, Header } from 'react-navigation'
import {
  TopScreen,
  LatestScreen,
  DetailScreen,
  SettingsScreen,
} from '../screens'
import { ThemeContext } from '../context'
import { LoginScreen } from '../screens/login'

// HACK: This is a hack to dynamic change header's style
const CustomHeader = props => {
  return (
    <ThemeContext.Consumer>
      {({ colors }) => {
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
    </ThemeContext.Consumer>
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

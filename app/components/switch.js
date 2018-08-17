import React from 'react'
import { Switch, Platform } from 'react-native'
import { ThemeConsumer } from '../context'

export default function CustomSwitch({ ...props }) {
  return (
    <ThemeConsumer>
      {({ colors }) => (
        <Switch
          // tintColor: iOS: border, Android: inactive background
          {...Platform.select({
            ios: {
              onTintColor: colors.settings.active, // iOS: background, Android: active background
            },
            android: {
              onTintColor: colors.settings.androidSwitchActiveBackground,
              thumbTintColor: props.value ? colors.settings.active : undefined,
            },
          })}
          {...props}
        />
      )}
    </ThemeConsumer>
  )
}

import React from 'react'
import { Switch } from 'react-native'
import { isAndroid } from '../utils'
import { ThemeConsumer } from '../context'

export default function CustomSwitch({ ...props }) {
  return (
    <ThemeConsumer>
      {({ colors }) => (
        <Switch
          onTintColor={
            isAndroid
              ? colors.settings.androidActiveBackground
              : colors.settings.active
          }
          thumbTintColor={isAndroid ? colors.settings.active : undefined}
          {...props}
        />
      )}
    </ThemeConsumer>
  )
}

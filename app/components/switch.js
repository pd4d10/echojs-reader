import React from 'react'
import { Switch } from 'react-native'
import { isAndroid } from '../utils'
import { ThemeContext } from '../context'

export default function CustomSwitch({ ...props }) {
  return (
    <ThemeContext.Consumer>
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
    </ThemeContext.Consumer>
  )
}

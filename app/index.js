import React from 'react'
import { StatusBar, Platform } from 'react-native'
import {
  ThemeProvider,
  SettingsProvider,
  AuthProvider,
  SettingsContext,
  ThemeContext,
  AuthContext,
} from './context'
import { BottomTabNavigator, MaterialBottomTabNavigator } from './navigators'

const AppContent = () => {
  const { colors } = React.useContext(ThemeContext)
  const { inSv } = React.useContext(SettingsContext)

  return (
    <>
      <StatusBar
        barStyle={Platform.select({
          ios: inSv
            ? colors.safari.statusBarStyle
            : colors.header.statusBarStyle,
        })}
        backgroundColor={Platform.select({
          android: colors.header.androidBar,
        })}
      />
      <BottomTabNavigator />
    </>
  )
}

export const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ThemeProvider>
  </AuthProvider>
)

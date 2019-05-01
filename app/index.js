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
  const { theme, colors } = React.useContext(ThemeContext)
  const { isInSafariView } = React.useContext(SettingsContext)
  const { ready } = React.useContext(AuthContext)

  // Make sure user auth is ready
  // So all fetch in componentDidMount works correctly
  if (!theme || !ready) return null

  return (
    <>
      <StatusBar
        barStyle={Platform.select({
          ios: isInSafariView
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

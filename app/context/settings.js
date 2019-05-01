import React from 'react'
import { Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import SafariView from 'react-native-safari-view'
import { STORAGE_KEYS } from '../constants'

export const SettingsContext = React.createContext()

export const SettingsProvider = ({ children }) => {
  const [useSafariView, setUSV] = React.useState(false)
  const [isInSafariView, setIn] = React.useState(false)
  const [isSafariViewAvailable, setA] = React.useState(false)
  const [isSafariViewStarted, setST] = React.useState(false)

  const init = async () => {
    const setInSafariView = () => {
      setIn(true)
    }
    const setOutSafariView = () => {
      setIn(false)
      setST(false)
    }

    let useSafariView = await AsyncStorage.getItem(STORAGE_KEYS.useSafariView)

    let available
    try {
      available = await SafariView.isAvailable()
      if (available) {
        SafariView.addEventListener('onShow', setInSafariView)
        SafariView.addEventListener('onDismiss', setOutSafariView)
      }
    } catch (err) {
      available = false
    }

    setUSV(useSafariView === 'true')
    setA(available)
  }

  React.useEffect(() => {
    init()
    return () => {
      if (isSafariViewAvailable) {
        SafariView.removeEventListener('onShow', setInSafariView)
        SafariView.removeEventListener('onDismiss', setOutSafariView)
      }
    }
  }, [])

  const setUseSafariView = value => {
    // Set state immediately to avoid switch UI delay
    setUSV(value)
    AsyncStorage.setItem(STORAGE_KEYS.useSafariView, useSafariView.toString())
  }

  const openLink = async (url, colors) => {
    if (isSafariViewAvailable && useSafariView) {
      // This is to avoid press multi times
      if (isSafariViewStarted) return
      setST(true)
      SafariView.show({
        url,
        tintColor: colors.safari.text,
        barTintColor: colors.safari.background,
      })
    } else {
      Linking.openURL(url)
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        isInSafariView,
        useSafariView,
        isSafariViewAvailable,
        setUseSafariView,
        openLink,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

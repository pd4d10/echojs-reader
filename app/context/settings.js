import React from 'react'
import { Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import SafariView from 'react-native-safari-view'
import { STORAGE_KEYS } from '../constants'

export const SettingsContext = React.createContext()

export const SettingsProvider = ({ children }) => {
  const [svAvailable, setSvAvailable] = React.useState(false)
  const [svEnable, _setSvEnable] = React.useState(false)
  const [inSv, setInSv] = React.useState(false)
  const [svStarted, setSvStarted] = React.useState(false)

  React.useEffect(() => {
    const handleShow = () => {
      setInSv(true)
    }
    const handleClose = () => {
      setInSv(false)
      setSvStarted(false)
    }

    ;(async () => {
      let enable = await AsyncStorage.getItem(STORAGE_KEYS.safariView)

      let available
      try {
        available = await SafariView.isAvailable()
        if (available) {
          SafariView.addEventListener('onShow', handleShow)
          SafariView.addEventListener('onDismiss', handleClose)
        }
      } catch (err) {
        available = false
      }

      _setSvEnable(enable === 'true')
      setSvAvailable(available)
    })()

    return () => {
      if (svAvailable) {
        SafariView.removeEventListener('onShow', handleShow)
        SafariView.removeEventListener('onDismiss', handleClose)
      }
    }
  }, [])

  const setSvEnable = React.useCallback(value => {
    // Set state immediately to avoid switch UI delay
    _setSvEnable(value)
    AsyncStorage.setItem(STORAGE_KEYS.safariView, value.toString())
  }, [])

  const openLink = React.useCallback(
    async (url, colors) => {
      if (svAvailable && svEnable) {
        // This is to avoid press multi times
        if (svStarted) return
        setSvStarted(true)
        SafariView.show({
          url,
          tintColor: colors.safari.text,
          barTintColor: colors.safari.background,
        })
      } else {
        Linking.openURL(url)
      }
    },
    [svAvailable, svEnable, svStarted],
  )

  return (
    <SettingsContext.Provider
      value={{
        inSv,
        svAvailable,
        svEnable,
        setSvEnable,
        openLink,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

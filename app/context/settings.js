import React from 'react'
import { AsyncStorage, Linking } from 'react-native'
import SafariView from 'react-native-safari-view'
import { STORAGE_KEYS } from '../constants'

const SettingsContext = React.createContext()

export const SettingsConsumer = SettingsContext.Consumer

export class SettingsProvider extends React.Component {
  state = {
    useSafariView: false,
    isInSafariView: false,
    isSafariViewAvailable: false,
    isSafariViewStarted: false,
  }

  async componentDidMount() {
    let useSafariView = await AsyncStorage.getItem(STORAGE_KEYS.useSafariView)
    useSafariView = useSafariView === 'true'

    let isSafariViewAvailable
    try {
      isSafariViewAvailable = await SafariView.isAvailable()
      if (isSafariViewAvailable) {
        SafariView.addEventListener('onShow', this.setInSafariView)
        SafariView.addEventListener('onDismiss', this.setOutSafariView)
      }
    } catch (err) {
      isSafariViewAvailable = false
    }

    this.setState({
      useSafariView,
      isSafariViewAvailable,
    })
  }

  async componentWillUnmount() {
    if (this.state.isSafariViewAvailable) {
      SafariView.removeEventListener('onShow', this.setInSafariView)
      SafariView.removeEventListener('onDismiss', this.setOutSafariView)
    }
  }

  setUseSafariView = async useSafariView => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.useSafariView,
      useSafariView.toString(),
    )
    this.setState({ useSafariView })
  }

  setInSafariView = () => {
    this.setState({ isInSafariView: true })
  }

  setOutSafariView = () => {
    this.setState({
      isInSafariView: false,
      isSafariViewStarted: false,
    })
  }

  openLink = async (url, colors) => {
    if (this.state.isSafariViewAvailable && this.state.useSafariView) {
      // This is to avoid press multi times
      if (this.state.isSafariViewStarted) return

      this.setState({ isSafariViewStarted: true })
      SafariView.show({
        url,
        tintColor: colors.safari.text,
        barTintColor: colors.safari.background,
      })
    } else {
      Linking.openURL(url)
    }
  }

  render() {
    const { isInSafariView, useSafariView, isSafariViewAvailable } = this.state
    const { setUseSafariView, openLink } = this
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
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

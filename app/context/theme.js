import React from 'react'
import { AsyncStorage } from 'react-native'
import { themeMapping, STORAGE_KEYS } from '../constants'

const ThemeContext = React.createContext()

export const ThemeConsumer = ThemeContext.Consumer

export class ThemeProvider extends React.Component {
  state = {
    theme: null,
  }

  async componentDidMount() {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.theme)
    // alert(theme)
    this.setState({
      theme: this.ensureCorrect(theme),
    })
  }

  ensureCorrect = theme => {
    if (Object.keys(themeMapping).includes(theme)) {
      return theme
    } else {
      return 'echojs'
    }
  }

  setTheme = async theme => {
    if (this.state.theme === theme) {
      return
    }
    await AsyncStorage.setItem(STORAGE_KEYS.theme, theme)
    theme = this.ensureCorrect(theme)
    this.setState({ theme })
  }

  render() {
    const { theme } = this.state
    const { setTheme } = this

    return (
      <ThemeContext.Provider
        value={{ theme, setTheme, colors: themeMapping[theme] }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

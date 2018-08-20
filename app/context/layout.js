import React from 'react'
import { AsyncStorage, Platform } from 'react-native'
import { STORAGE_KEYS, layoutMapping } from '../constants'

const LayoutContext = React.createContext()

export const LayoutConsumer = LayoutContext.Consumer

export class LayoutProvider extends React.Component {
  state = {
    layout: null,
  }

  async componentDidMount() {
    const layout = await AsyncStorage.getItem(STORAGE_KEYS.layout)
    this.setState({
      layout: this.ensureCorrect(layout),
    })
  }

  ensureCorrect = layout => {
    if (Object.keys(layoutMapping).includes(layout)) {
      return layout
    } else {
      return Platform.select({
        ios: 'bottom-tab',
        android: 'drawer',
      })
    }
  }

  setLayout = async layout => {
    await AsyncStorage.setItem(STORAGE_KEYS.layout, layout)
    this.setState({
      layout: this.ensureCorrect(layout),
    })
  }

  render() {
    const { layout } = this.state
    const { setLayout } = this

    return (
      <LayoutContext.Provider
        value={{ layout, setLayout, layoutDetail: layoutMapping[layout] }}
      >
        {this.props.children}
      </LayoutContext.Provider>
    )
  }
}

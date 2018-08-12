import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Switch,
  AsyncStorage,
} from 'react-native'
import { colors } from './utils'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  state = { status: false }

  componentDidMount() {}

  getSettings = async () => {
    const settings = await AsyncStorage.getItem('settings')
    this.setState({ ...settings })
  }

  saveSettings = async data => {
    await AsyncStorage.setItem('settings', JSON.stringify(data))
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: colors.background }}>
        {/* <StatusBar barStyle="light-content" /> */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 12,
            }}
          >
            <View>
              <Text>Set</Text>
            </View>
            <Switch
              style={{}}
              onTintColor={colors.primary}
              value={this.state.status}
              onValueChange={status => {
                this.setState({ status })
              }}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>EchoJS v0.0.1</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

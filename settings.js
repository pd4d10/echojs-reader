import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Switch,
  Picker,
  AsyncStorage,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { colors } from './utils'
import { ThemeContext } from './App'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  state = {
    status: false,
  }

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
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#EFEFF4',
          paddingVertical: 20,
        }}
      >
        <TableView>
          <Section>
            <Cell
              title="Language"
              accessory="DisclosureIndicator"
              onPress={() => alert('Heyho!')}
            />
            <Cell
              title="Theme"
              accessory="DisclosureIndicator"
              onPress={() => alert('Heyho!')}
            />
          </Section>
          <ThemeContext.Consumer>
            {({ layout, setLayout }) => (
              <Section header="LAYOUT STYLE">
                <Cell
                  title="iOS"
                  accessory={layout === 'ios' ? 'Checkmark' : undefined}
                  onPress={() => setLayout('ios')}
                />
                <Cell
                  title="Android"
                  accessory={layout === 'android' ? 'Checkmark' : undefined}
                  onPress={() => setLayout('android')}
                />
              </Section>
            )}
          </ThemeContext.Consumer>
          <Section header="ABOUT">
            <Cell
              title="Source Code"
              titleTextColor="#007AFF"
              onPress={() => console.log('open Help/FAQ')}
            />
            <Cell accessory="DisclosureIndicator" title="License (MIT)" />
          </Section>
        </TableView>
      </ScrollView>
    )
  }
}

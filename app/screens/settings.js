import React from 'react'
import { ScrollView } from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { LayoutContext, ThemeContext } from '../context'
import { layoutMapping } from '../constants'

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#EFEFF4',
          paddingVertical: 20,
        }}
      >
        <TableView>
          <LayoutContext.Consumer>
            {({ layout, setLayout }) => (
              <Section header="LAYOUT STYLE">
                {Object.keys(layoutMapping).map(item => (
                  <Cell
                    key={item}
                    title={layoutMapping[item].name}
                    accessory={layout === item ? 'Checkmark' : undefined}
                    onPress={() => setLayout(item)}
                  />
                ))}
              </Section>
            )}
          </LayoutContext.Consumer>
          <ThemeContext.Consumer>
            {({ theme, setTheme }) => (
              <Section header="THEME">
                {['Light', 'EchoJS', 'Dark'].map(item => (
                  <Cell
                    key={item}
                    title={item}
                    accessory={
                      theme === item.toLowerCase() ? 'Checkmark' : undefined
                    }
                    onPress={() => setTheme(item.toLowerCase())}
                  />
                ))}
              </Section>
            )}
          </ThemeContext.Consumer>
        </TableView>
        <Section header="ABOUT">
          <Cell
            title="Source Code"
            titleTextColor="#007AFF"
            onPress={() => console.log('open Help/FAQ')}
          />
          <Cell accessory="DisclosureIndicator" title="License (MIT)" />
        </Section>
      </ScrollView>
    )
  }
}

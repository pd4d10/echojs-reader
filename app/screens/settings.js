import React from 'react'
import { ScrollView, Switch } from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { LayoutContext, ThemeContext, SettingsConsumer } from '../context'
import { layoutMapping, themeMapping } from '../constants'

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
                {Object.keys(themeMapping).map(item => (
                  <Cell
                    key={item}
                    title={themeMapping[item].title}
                    accessory={theme === item ? 'Checkmark' : undefined}
                    onPress={() => setTheme(item)}
                  />
                ))}
              </Section>
            )}
          </ThemeContext.Consumer>
          <SettingsConsumer>
            {({ openInBrowser, setOpenInBrowser }) => (
              <Section>
                <Cell
                  cellAccessoryView={
                    <Switch
                      value={openInBrowser}
                      onValueChange={setOpenInBrowser}
                    />
                  }
                  title="Open In Browser"
                />
              </Section>
            )}
          </SettingsConsumer>
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

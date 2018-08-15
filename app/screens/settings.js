import React from 'react'
import { ScrollView } from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { LayoutContext, ThemeContext, SettingsConsumer } from '../context'
import { layoutMapping, themeMapping } from '../constants'
import CustomSwitch from '../components/switch'

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme, colors }) => (
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
                        accessoryColor={colors.settings.active}
                        onPress={() => setLayout(item)}
                      />
                    ))}
                  </Section>
                )}
              </LayoutContext.Consumer>
              <Section header="THEME">
                {Object.keys(themeMapping).map(item => (
                  <Cell
                    key={item}
                    title={themeMapping[item].title}
                    accessory={theme === item ? 'Checkmark' : undefined}
                    accessoryColor={colors.settings.active}
                    onPress={() => setTheme(item)}
                  />
                ))}
              </Section>
              <Section>
                <Cell
                  cellAccessoryView={
                    <SettingsConsumer>
                      {({ openInBrowser, setOpenInBrowser }) => (
                        <CustomSwitch
                          value={openInBrowser}
                          onValueChange={setOpenInBrowser}
                        />
                      )}
                    </SettingsConsumer>
                  }
                  title="Open In Browser"
                />
              </Section>
            </TableView>
            <SettingsConsumer>
              {({ openLink }) => (
                <Section header="ABOUT">
                  <Cell
                    title="Source Code"
                    accessory="DisclosureIndicator"
                    onPress={() => {
                      const url = 'https://github.com/pd4d10/lamernews-app'
                      openLink(url, colors, () => {
                        this.props.navigation.navigate('WebView', {
                          url,
                        })
                      })
                    }}
                  />
                </Section>
              )}
            </SettingsConsumer>
          </ScrollView>
        )}
      </ThemeContext.Consumer>
    )
  }
}

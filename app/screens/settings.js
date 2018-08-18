import React from 'react'
import { ScrollView, View, Button, TextInput } from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import {
  SettingsConsumer,
  ThemeConsumer,
  LayoutConsumer,
  AuthConsumer,
} from '../context'
import { layoutMapping, themeMapping } from '../constants'
import CustomSwitch from '../components/switch'

export class SettingsScreen extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme, setTheme, colors }) => (
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
              backgroundColor: colors.settings.background,
            }}
          >
            <TableView>
              <Section sectionTintColor="transparent">
                <Cell
                  cellContentView={
                    <AuthConsumer>
                      {({ auth, username, logout }) =>
                        auth ? (
                          <Button title="Logout" onPress={logout} />
                        ) : (
                          <Button
                            title="Login"
                            onPress={() => {
                              this.props.navigation.navigate('Login')
                            }}
                          />
                        )
                      }
                    </AuthConsumer>
                  }
                />
              </Section>
              <LayoutConsumer>
                {({ layout, setLayout }) => (
                  <Section header="LAYOUT STYLE" sectionTintColor="transparent">
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
              </LayoutConsumer>
              <Section header="THEME" sectionTintColor="transparent">
                {Object.keys(themeMapping).map(item => (
                  <Cell
                    key={item}
                    title={themeMapping[item].name}
                    accessory={theme === item ? 'Checkmark' : undefined}
                    accessoryColor={colors.settings.active}
                    onPress={() => setTheme(item)}
                  />
                ))}
              </Section>
              <Section
                footer="Open links in system browser instead of SafariView or WebView."
                sectionTintColor="transparent"
              >
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
                  title="Open Links In Browser"
                />
              </Section>
            </TableView>
            <SettingsConsumer>
              {({ openLink }) => (
                <Section header="ABOUT" sectionTintColor="transparent">
                  <Cell
                    title="Source Code"
                    accessory="DisclosureIndicator"
                    onPress={() => {
                      const url = 'https://github.com/pd4d10/lamernews-app'
                      openLink(url, colors, () => {
                        this.props.navigation.navigate('WebView', {
                          title: 'Source Code',
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
      </ThemeConsumer>
    )
  }
}

// export const SettingsScreen = props => (

// )

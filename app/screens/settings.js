import React from 'react'
import { ScrollView, View, Button, Text } from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import {
  SettingsConsumer,
  ThemeConsumer,
  LayoutConsumer,
  AuthConsumer,
} from '../context'
import { layoutMapping, themeMapping } from '../constants'
import CustomSwitch from '../components/switch'
import { confirm } from '../utils'

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
                <AuthConsumer>
                  {({ auth, username, logout }) =>
                    auth ? (
                      <Cell
                        cellContentView={
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16 }}>{username}</Text>
                          </View>
                        }
                        cellAccessoryView={
                          <Button
                            title="Logout"
                            onPress={() => {
                              confirm('Are you sure to logout?', logout)
                            }}
                          />
                        }
                      />
                    ) : (
                      <Cell
                        cellContentView={
                          <View style={{ flex: 1 }}>
                            <Button
                              title="Login"
                              color={colors.settings.active}
                              onPress={() => {
                                this.props.navigation.navigate('Login')
                              }}
                            />
                          </View>
                        }
                      />
                    )
                  }
                </AuthConsumer>
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
              <SettingsConsumer>
                {({ openInBrowser, isSafariViewAvailable, setOpenInBrowser }) =>
                  isSafariViewAvailable && (
                    <Section
                      footer="Open links in system browser instead of Safari View Controller."
                      sectionTintColor="transparent"
                    >
                      <Cell
                        cellAccessoryView={
                          <CustomSwitch
                            value={openInBrowser}
                            onValueChange={setOpenInBrowser}
                          />
                        }
                        title="Open Links In Browser"
                      />
                    </Section>
                  )
                }
              </SettingsConsumer>
            </TableView>
            <SettingsConsumer>
              {({ openLink }) => (
                <Section header="ABOUT" sectionTintColor="transparent">
                  <Cell
                    title="Source Code"
                    accessory="DisclosureIndicator"
                    onPress={() => {
                      openLink(
                        'https://github.com/pd4d10/lamernews-app',
                        colors,
                      )
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

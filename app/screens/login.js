import React from 'react'
import { View, Button, TextInput } from 'react-native'
import { Cell, Section } from 'react-native-tableview-simple'
import { AuthConsumer, ThemeConsumer } from '../context'

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  state = {
    username: '',
    password: '',
  }

  render() {
    return (
      <AuthConsumer>
        {({ login, createAccount }) => (
          <View style={{ flex: 1 }}>
            <Section sectionTintColor="transparent">
              <Cell
                cellContentView={
                  <TextInput
                    value={this.state.username}
                    style={{ fontSize: 16, flex: 1 }}
                    placeholder="Username"
                    onChangeText={username => {
                      this.setState({ username })
                    }}
                  />
                }
              />
              <Cell
                cellContentView={
                  <TextInput
                    value={this.state.password}
                    style={{ fontSize: 16, flex: 1 }}
                    placeholder="Password"
                    onChangeText={password => {
                      this.setState({ password })
                    }}
                  />
                }
              />
            </Section>
            <ThemeConsumer>
              {({ colors }) => (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexGrow: 1 }}>
                    <Button
                      title="Login"
                      color={colors.settings.active}
                      onPress={async () => {
                        const { username, password } = this.state
                        if (!username || !password) {
                          alert('Please input username and password')
                          return
                        }
                        try {
                          await login(username, password)
                          this.props.navigation.goBack()
                        } catch (err) {
                          alert(err.message)
                        }
                      }}
                    />
                  </View>
                  <View style={{ flexGrow: 1 }}>
                    <Button
                      title="Create account"
                      color={colors.settings.active}
                      onPress={async () => {
                        const { username, password } = this.state
                        if (!username || !password) {
                          alert('Please input username and password')
                          return
                        }
                        try {
                          await createAccount(username, password)
                          await login(username, password)
                          this.props.navigation.goBack()
                        } catch (err) {
                          alert(err.message)
                        }
                      }}
                    />
                  </View>
                </View>
              )}
            </ThemeConsumer>
          </View>
        )}
      </AuthConsumer>
    )
  }
}

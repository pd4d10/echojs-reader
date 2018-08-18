import React from 'react'
import { View, Button, TextInput } from 'react-native'
import { Cell, Section } from 'react-native-tableview-simple'
import { AuthConsumer } from '../context'

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  state = {
    // modalVisible: false,
    username: '',
    password: '',
  }

  render() {
    return (
      <AuthConsumer>
        {({ login }) => (
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
            <Button
              title="Login"
              onPress={async () => {
                const { username, password } = this.state
                if (!username || !password) {
                  alert('Please input username and password')
                  return
                }
                await login(username, password)
                this.props.navigation.goBack()
              }}
            />
          </View>
        )}
      </AuthConsumer>
    )
  }
}

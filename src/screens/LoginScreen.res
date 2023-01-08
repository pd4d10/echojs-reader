open ReactNative
open TableView

module M = {
  type params
  type options
}
module Navigation = ReactNavigation.Core.NavigationScreenProp(M)

@react.component
let make = () => {
  let navigation = ReactNavigation.Native.useNavigation()->Js.toOption->Option.getExn

  let {colors} = React.useContext(ThemeContext.context)->Option.getExn
  let auth = React.useContext(AuthContext.context)

  let (username, setUsername) = React.useState(_ => "")
  let (password, setPassword) = React.useState(_ => "")

  <View style={Style.viewStyle(~flex=1., ())}>
    <Section sectionTintColor=#transparent>
      <Cell
        withSafeAreaView=false
        cellContentView={<TextInput
          value=username
          onChangeText={v => setUsername(_ => v)}
          style={Style.textStyle(~fontSize=16., ~flex=1., ())}
          placeholder="Username"
        />}
      />
      <Cell
        withSafeAreaView=false
        cellContentView={<TextInput
          value=password
          onChangeText={v => setPassword(_ => v)}
          style={Style.textStyle(~fontSize=16., ~flex=1., ())}
          placeholder="Password"
          secureTextEntry=true
        />}
      />
    </Section>
    <View style={Style.viewStyle(~flexDirection=#row, ())}>
      <View style={Style.viewStyle(~flexGrow=1., ())}>
        <Button
          title="Login"
          color=colors.settingsActive
          onPress={_ => {
            switch (username, password) {
            | ("", _) | (_, "") => Alert.alert(~title="Please enter a username and password", ())
            | _ => {
                let doLogin = async () => {
                  await auth->AuthContext.login(~username, ~password)
                  navigation->Navigation.goBack()
                }
                doLogin()->ignore
              }
            }
          }}
        />
      </View>
      <View style={Style.viewStyle(~flexGrow=1., ())}>
        <Button
          title="Create account"
          color=colors.settingsActive
          onPress={_ => {
            switch (username, password) {
            | ("", _) | (_, "") => Alert.alert(~title="Please enter a username and password", ())
            | _ => {
                let doCreate = async () => {
                  await auth->AuthContext.createAccount(~username, ~password)
                  await auth->AuthContext.login(~username, ~password)
                  navigation->Navigation.goBack()
                }
                doCreate()->ignore
              }
            }
          }}
        />
      </View>
    </View>
  </View>
}

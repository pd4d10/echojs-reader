open ReactNative
open TableView

module M = {
  type params
  type options
}
module Navigation = ReactNavigation.Core.NavigationScreenProp(M)

@react.component
let make = (~navigation as _, ~route as _) => {
  let navigation = ReactNavigation.Native.useNavigation()->Js.toOption->Option.getExn
  let auth = React.useContext(AuthContext.context)
  let {theme, setTheme, colors} = React.useContext(ThemeContext.context)->Option.getExn

  <ScrollView contentContainerStyle={Style.viewStyle(~paddingVertical=20.->Style.dp, ())}>
    <TableView>
      <Section sectionTintColor=#transparent>
        {switch auth.state {
        | Some({username}) =>
          <Cell
            cellContentView={<View style={Style.viewStyle(~flex=1., ())}>
              <Text style={Style.textStyle(~fontSize=16., ())}> {username->React.string} </Text>
            </View>}
            cellAccessoryView={<Button
              title="Logout"
              color=colors.settingsActive
              onPress={_ => {
                Alert.alert(
                  ~title="Confirm",
                  ~message="Are you sure to logout?",
                  ~buttons=[
                    {text: "Cancel", style: #cancel},
                    {
                      text: "OK",
                      onPress: _ => {
                        auth->AuthContext.logout->ignore
                      },
                    },
                  ],
                  ~options={cancelable: false},
                  (),
                )
              }}
            />}
          />
        | None =>
          <Cell
            cellContentView={<View style={Style.viewStyle(~flex=1., ())}>
              <Button
                title="Login / Create account"
                color=colors.settingsActive
                onPress={_ => {
                  navigation->Navigation.navigate("Login")
                }}
              />
            </View>}
          />
        }}
      </Section>
      <Section header="THEME" sectionTintColor=#transparent>
        {[ThemeContext.Theme.Light, ThemeContext.Theme.Dark]
        ->Array.map(item => {
          let themeS = ThemeContext.Theme.toString(item)

          <Cell
            key=themeS
            title=themeS
            accessory=?{theme == item ? Some(#Checkmark) : None}
            accessoryColor=colors.settingsActive
            onPress={_ => {
              setTheme(item)
            }}
          />
        })
        ->React.array}
      </Section>
    </TableView>
    <Section header="ABOUT" sectionTintColor=#transparent>
      <Cell
        title="Source Code"
        accessory=#DisclosureIndicator
        onPress={_ => {
          Expo.WebBrowser.openBrowserAsync("https://github.com/pd4d10/echojs-reader", ())->ignore
        }}
      />
    </Section>
  </ScrollView>
}

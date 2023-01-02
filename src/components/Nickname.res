open ReactNative

@react.component
let make = (~name) => {
  <Text
    style={Style.textStyle(~textDecorationLine=#underline, ())}
    onPress={_ => {
      Expo.WebBrowser.openBrowserAsync(`https://echojs.com/user/${name}`, ())->ignore
    }}>
    {name->React.string}
  </Text>
}

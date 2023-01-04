open ReactNative

@react.component
let make = (~item: Model.post) => {
  let theme = ThemeContext.context->React.useContext->Option.getExn

  <View>
    <Text
      style={Style.textStyle(
        ~color=item.voted == Some(#up) ? theme.colors.primary : theme.colors.contentIcon,
        (),
      )}>
      {`▲ ${item.up->Option.getWithDefault("0")}`->React.string}
    </Text>
    <Text
      style={Style.textStyle(
        ~color=item.voted == Some(#down) ? theme.colors.primary : theme.colors.contentIcon,
        (),
      )}>
      {`▼ ${item.down->Option.getWithDefault("0")}`->React.string}
    </Text>
  </View>
}

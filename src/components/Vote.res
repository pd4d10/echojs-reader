open ReactNative

@react.component
let make = (~item: Model.comment) => {
  let theme = ThemeContext.context->React.useContext->Option.getExn

  <View>
    <Text
      style={Style.textStyle(
        ~color=item.voted == "up" ? theme.colors.primary : theme.colors.contentIcon,
        (),
      )}>
      {`▲ ${item.up->Option.getWithDefault(0)->Int.toString}`->React.string}
    </Text>
    <Text
      style={Style.textStyle(
        ~color=item.voted == "down" ? theme.colors.primary : theme.colors.contentIcon,
        (),
      )}>
      {`▼ ${item.down->Option.getWithDefault(0)->Int.toString}`->React.string}
    </Text>
  </View>
}

open ReactNative

@react.component
let make = (~up, ~down, ~voted) => {
  let theme = Theme.context->React.useContext->Option.getExn

  <View>
    <Text
      style={Style.textStyle(
        ~color=voted == Some(#up) ? theme.colors.primary : theme.colors.contentIcon,
        (),
      )}>
      {`▲ ${up->Int.toString}`->React.string}
    </Text>
    <Text
      style={Style.textStyle(
        ~color=voted == Some(#down) ? theme.colors.primary : theme.colors.contentIcon,
        (),
      )}>
      {`▼ ${down->Int.toString}`->React.string}
    </Text>
  </View>
}

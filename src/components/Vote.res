open ReactNative

type item = {
  up?: int,
  down?: int,
  voted: string,
}

@react.component
let make = (~colors, ~item) => {
  <View>
    <Text
      style={Style.textStyle(
        ~color=item.voted == "up" ? colors["contentVoted"] : colors["contentIcon"],
        (),
      )}>
      {`▲ ${item.up->Option.getWithDefault(0)->Int.toString}`->React.string}
    </Text>
    <Text
      style={Style.textStyle(
        ~color=item.voted == "down" ? colors["contentVoted"] : colors["contentIcon"],
        (),
      )}>
      {`▼ ${item.down->Option.getWithDefault(0)->Int.toString}`->React.string}
    </Text>
  </View>
}

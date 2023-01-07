open ReactNative

@react.component
let make = (~style, ~size=ActivityIndicator.Size.small) => {
  let theme = React.useContext(ThemeContext.context)
  let color = switch Platform.os {
  | #android => theme->Option.map(theme => theme.colors.primary)
  | _ => None
  }

  switch color {
  | Some(color) => <ActivityIndicator color style size />
  | None => <ActivityIndicator style size />
  }
}

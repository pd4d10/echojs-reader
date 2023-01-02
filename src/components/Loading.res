open ReactNative

@react.component
let make = (~style, ~size) => {
  let theme = React.useContext(ThemeContext.context)
  let color = switch Platform.os {
  | #android => theme->Option.flatMap(theme => theme.colors.contentLoading)
  | _ => None
  }

  switch color {
  | Some(color) => <ActivityIndicator color style size />
  | None => <ActivityIndicator style size />
  }
}

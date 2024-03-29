open ReactNative

@react.component
let make = (~style=?, ~size=?) => {
  let theme = Theme.context->React.useContext
  let color = switch Platform.os {
  | #android => theme->Option.map(theme => theme.colors.primary)
  | _ => None
  }

  <ActivityIndicator ?color ?style ?size />
}

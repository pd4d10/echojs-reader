type theme = [#light | #dark]

type colors = {
  headerStatusBar?: string,
  headerText?: string,
  headerBackground?: string,
  headerAndroidBar?: string,
  contentTitle?: string,
  contentUrl?: string,
  contentUser?: string,
  contentBorder?: string,
  contentBackground?: string,
  contentIcon?: string,
  contentLoading?: string,
  contentVoted?: string,
  tabActive?: string,
  tabInactive?: string,
  tabActiveBackground?: string,
  tabInactiveBackground?: string,
  safariStatusBar?: string,
  safariText?: string,
  safariBackground?: string,
  settingsBackground?: string,
  settingsActive?: string,
  settingsAndroidSwitchActiveBackground?: string,
}

type value = {
  theme: theme,
  setTheme: theme => unit,
  colors: colors,
}

let context = React.createContext(None)

module Provider = {
  @react.component
  let make = (~children) => {
    let (theme, _setTheme) = React.useState(_ => None)

    React.useEffect0(() => {
      Storage.storage.getItem(. #theme)
      ->Js.Promise2.then(v => {
        _setTheme(_ => v)
        Js.Promise2.resolve()
      })
      ->ignore

      None
    })

    let setTheme = v => {
      _setTheme(_ => v->Some)
      Storage.storage.setItem(. #theme, v)->ignore
    }

    let value = theme->Option.flatMap(theme => {
      let colors = switch theme {
      | #dark => {
          // TODO:
          headerStatusBar: "dark-content",
        }
      | _ => {
          headerStatusBar: "light-content",
          headerText: "#fff",
          headerBackground: "#af1d1d",
          headerAndroidBar: "#831616",
          contentTitle: "#000",
          contentUrl: "#999",
          contentUser: "#666",
          contentBorder: "#eee",
          contentBackground: "#fff",
          contentIcon: "#444",
          contentLoading: "#af1d1d",
          contentVoted: "#af1d1d",
          tabActive: "#af1d1d",
          tabInactive: "grey",
          // tabActiveBackground:
          // tabInactiveBackground:
          safariStatusBar: "dark-content",
          safariText: "#af1d1d",
          // safariBackground:
          // settingsBackground:
          settingsActive: "#af1d1d",
          settingsAndroidSwitchActiveBackground: "#faa",
        }
      }

      {theme, setTheme, colors}->Some
    })

    switch value {
    | None => React.null
    | Some(value) =>
      context
      ->React.Context.provider
      ->React.createElement({"value": Some(value), "children": children})
    }
  }
}

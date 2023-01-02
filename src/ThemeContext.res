type theme = [#default | #light | #dark]

type colors = {
  primary: string,
  headerStatusBar: ReactNative.StatusBar.barStyle,
  headerAndroidBar: string,
  contentTitle: string,
  contentUrl: string,
  contentUser: string,
  contentBorder: string,
  contentBackground: string,
  contentIcon: string,
  tabInactive: string,
  safariStatusBar: ReactNative.StatusBar.barStyle,
  settingsActive: string,
  settingsAndroidSwitchActiveBackground: string,
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
          primary: "#af1d1d",
          headerStatusBar: #"dark-content",
          headerAndroidBar: "#831616",
          contentTitle: "#000",
          contentUrl: "#999",
          contentUser: "#666",
          contentBorder: "#eee",
          contentBackground: "#fff",
          contentIcon: "#444",
          tabInactive: "grey",
          safariStatusBar: #"dark-content",
          settingsActive: "#af1d1d",
          settingsAndroidSwitchActiveBackground: "#faa",
        }
      | _ => {
          primary: "#af1d1d",
          headerStatusBar: #"light-content",
          headerAndroidBar: "#831616",
          contentTitle: "#000",
          contentUrl: "#999",
          contentUser: "#666",
          contentBorder: "#eee",
          contentBackground: "#fff",
          contentIcon: "#444",
          tabInactive: "grey",
          safariStatusBar: #"dark-content",
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

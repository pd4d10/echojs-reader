module Theme = {
  type t = Light | Dark
  let toString = v => {
    switch v {
    | Light => "light"
    | Dark => "dark"
    }
  }
  let fromString = v => {
    switch v {
    | "light" => Some(Light)
    | "dark" => Some(Dark)
    | _ => None
    }
  }
}

type colors = {
  primary: string,
  headerStatusBar: Expo.StatusBar.style,
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
  theme: Theme.t,
  setTheme: Theme.t => unit,
  colors: colors,
}

let context = React.createContext(None)

module Provider = {
  @react.component
  let make = (~children) => {
    let (theme, _setTheme) = React.useState(_ => None)

    React.useEffect0(() => {
      ReactNativeAsyncStorage.getItem("theme")
      ->Promise.then(v => {
        _setTheme(
          _ =>
            v->Null.toOption->Option.flatMap(Theme.fromString)->Option.getWithDefault(Light)->Some,
        )
        Promise.resolve()
      })
      ->ignore

      None
    })

    let setTheme = v => {
      _setTheme(_ => v->Some)
      ReactNativeAsyncStorage.setItem("theme", v->Theme.toString)->ignore
    }

    let value = theme->Option.flatMap(theme => {
      let colors = switch theme {
      | Theme.Dark => {
          // TODO:
          primary: "#af1d1d",
          headerStatusBar: #dark,
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
          headerStatusBar: #light,
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
      context->React.Context.provider->React.createElement({value: Some(value), children})
    }
  }
}

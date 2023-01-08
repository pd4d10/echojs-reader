module WebBrowser = {
  type openOptions = {
    controlsColor?: string,
    dismissButtonStyle?: [#done | #close | #cancel],
    toolbarColor?: string,
  }

  type result = {@as("type") type_: [#cancel | #dismiss | #locked | #opened]}

  @module("expo-web-browser")
  external openBrowserAsync: (string, ~browserParams: openOptions=?, unit) => promise<result> =
    "openBrowserAsync"
}

module StatusBar = {
  type style = [#auto | #inverted | #light | #dark]

  @react.component @module("expo-status-bar")
  external make: (~style: style=?, ~backgroundColor: string=?) => React.element = "StatusBar"
}

module ActionSheet = {
  type options = {
    title?: string,
    options: array<string>,
    cancelButtonIndex?: int,
  }

  type actionSheetProps = {showActionSheetWithOptions: (. options, ~callback: int => unit) => unit}

  @module("@expo/react-native-action-sheet")
  external useActionSheet: unit => actionSheetProps = "useActionSheet"

  module ActionSheetProvider = {
    @react.component @module("@expo/react-native-action-sheet")
    external make: (~children: React.element=?) => React.element = "ActionSheetProvider"
  }
}

module VectorIcons = {
  module Ionicons = {
    @react.component @module("@expo/vector-icons")
    external make: (
      ~name: string=?,
      ~size: int=?,
      ~color: string=?,
      ~style: ReactNative.Style.t=?,
      unit,
    ) => React.element = "Ionicons"
  }
  module Entypo = {
    @react.component @module("@expo/vector-icons")
    external make: (
      ~name: string=?,
      ~size: int=?,
      ~color: string=?,
      ~style: ReactNative.Style.t=?,
      unit,
    ) => React.element = "Entypo"
  }
  module MaterialCommunityIcons = {
    @react.component @module("@expo/vector-icons")
    external make: (
      ~name: string=?,
      ~size: int=?,
      ~color: string=?,
      ~style: ReactNative.Style.t=?,
      unit,
    ) => React.element = "MaterialCommunityIcons"
  }
}

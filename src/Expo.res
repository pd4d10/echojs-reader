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

module ActionSheet = {
  type options = {
    title?: string,
    options: array<string>,
    cancelButtonIndex?: int,
  }

  type actionSheetProps = {showActionSheetWithOptions: (. options, ~callback: int => unit) => unit}

  @module("@expo/react-native-action-sheet")
  external useActionSheet: unit => actionSheetProps = "useActionSheet"
}

module VectorIcons = {
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

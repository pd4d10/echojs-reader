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

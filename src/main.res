module App = {
  @react.component
  let make = () => {
    let {colors} = Theme.context->React.useContext->Option.getExn

    <ReactNavigation.Native.NavigationContainer
      theme={{
        ...ReactNavigation.Native.defaultTheme,
        colors: {
          ...ReactNavigation.Native.defaultTheme.colors,
          primary: colors.primary,
        },
      }}>
      <Expo.StatusBar
        style=colors.headerStatusBar
        backgroundColor=?{switch ReactNative.Platform.os {
        | #android => Some(colors.headerAndroidBar)
        | _ => None
        }}
      />
      <BottomTabs />
    </ReactNavigation.Native.NavigationContainer>
  }
}

@react.component
let default = () => {
  <Auth.Provider>
    <Theme.Provider>
      <Expo.ActionSheet.ActionSheetProvider>
        <App />
      </Expo.ActionSheet.ActionSheetProvider>
    </Theme.Provider>
  </Auth.Provider>
}

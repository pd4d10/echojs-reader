module App = {
  @react.component
  let make = () => {
    let {colors} = React.useContext(ThemeContext.context)->Option.getExn

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
  <AuthContext.Provider>
    <ThemeContext.Provider>
      <Expo.ActionSheet.ActionSheetProvider>
        <App />
      </Expo.ActionSheet.ActionSheetProvider>
    </ThemeContext.Provider>
  </AuthContext.Provider>
}

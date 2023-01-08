module M = {
  type params
}
module Stack = ReactNavigation.NativeStack.Make(M)

@react.component
let make = (~navigation as _, ~route as _) => {
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen.make} />
    <Stack.Screen name="Login" component={LoginScreen.make} />
  </Stack.Navigator>
}

module M = {
  type params
}
module Stack = ReactNavigation.NativeStack.Make(M)

@react.component
let make = (~navigation as _, ~route as _) => {
  <Stack.Navigator>
    <Stack.Screen name="Top news" component={TopScreen.make} />
    <Stack.Screen name="Detail" component={DetailScreen.make} />
    <Stack.Screen name="Login" component={LoginScreen.make} />
  </Stack.Navigator>
}

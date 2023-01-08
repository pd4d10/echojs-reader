module M = {
  type params
}
module Tab = ReactNavigation.BottomTabs.Make(M)
module TopStack = ReactNavigation.NativeStack.Make(M)
module LatestStack = ReactNavigation.NativeStack.Make(M)
module SettingsStack = ReactNavigation.NativeStack.Make(M)

@react.component
let make = () => {
  let {colors} = React.useContext(ThemeContext.context)->Option.getExn

  let getIconColor = focused => {
    focused ? colors.primary : colors.tabInactive
  }

  <Tab.Navigator
    screenOptions={_ =>
      Tab.options(
        ~headerShown=false,
        ~tabBarActiveTintColor=colors.primary,
        ~tabBarInactiveTintColor=colors.tabInactive,
        (),
      )}>
    <Tab.Screen
      name="Top"
      component={_ =>
        <TopStack.Navigator>
          <TopStack.Screen name="Top news" component={_ => <ListScreen sort="top" />} />
          <TopStack.Screen name="Detail" component={_ => <DetailScreen />} />
          <TopStack.Screen name="Login" component={_ => <LoginScreen />} />
        </TopStack.Navigator>}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Entypo name="bar-graph" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
    <Tab.Screen
      name="Latest"
      component={_ =>
        <LatestStack.Navigator>
          <LatestStack.Screen name="Latest news" component={_ => <ListScreen sort="latest" />} />
          <LatestStack.Screen name="Detail" component={_ => <DetailScreen />} />
          <LatestStack.Screen name="Login" component={_ => <LoginScreen />} />
        </LatestStack.Navigator>}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Ionicons name="md-time" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
    <Tab.Screen
      name="Settings"
      component={_ =>
        <SettingsStack.Navigator>
          <SettingsStack.Screen name="Settings" component={_ => <SettingsScreen />} />
          <SettingsStack.Screen name="Login" component={_ => <LoginScreen />} />
        </SettingsStack.Navigator>}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Ionicons name="md-time" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
  </Tab.Navigator>
}

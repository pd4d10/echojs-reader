module M = {
  type params
}
module Tab = ReactNavigation.BottomTabs.Make(M)

@react.component
let make = () => {
  let {colors} = Theme.context->React.useContext->Option.getExn

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
      component={TopStack.make}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Entypo name="bar-graph" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
    <Tab.Screen
      name="Latest"
      component={LatestStack.make}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Ionicons name="md-time" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsStack.make}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Ionicons name="md-time" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
  </Tab.Navigator>
}

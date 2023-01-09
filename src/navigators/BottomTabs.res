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
      name="TopStack"
      component={TopStack.make}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Entypo name="bar-graph" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
    <Tab.Screen
      name="LatestStack"
      component={LatestStack.make}
      options={_ =>
        Tab.options(
          ~tabBarIcon=({focused}) =>
            <Expo.VectorIcons.Ionicons name="md-time" size=24 color={getIconColor(focused)} />,
          (),
        )}
    />
    <Tab.Screen
      name="SettingsStack"
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

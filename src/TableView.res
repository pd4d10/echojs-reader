module TableView = {
  @module("react-native-tableview-simple") @react.component
  external make: (~children: React.element=?) => React.element = "TableView"
}

module Section = {
  @module("react-native-tableview-simple") @react.component
  external make: (
    ~header: string=?,
    ~sectionTintColor: [#transparent]=?,
    ~children: React.element=?,
  ) => React.element = "Section"
}

module Cell = {
  @module("react-native-tableview-simple") @react.component
  external make: (
    ~title: string=?,
    ~cellContentView: React.element=?,
    ~cellAccessoryView: React.element=?,
    ~accessory: [#Checkmark | #DisclosureIndicator]=?,
    ~accessoryColor: string=?,
    ~onPress: unit => unit=?,
    ~withSafeAreaView: bool=?,
  ) => React.element = "Cell"
}

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './screens'

export default createMaterialBottomTabNavigator({
  Top: TopNavigator,
  Latest: LatestNavigator,
  Settings: SettingsNavigator,
})

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './stack'

export default createMaterialBottomTabNavigator({
  Top: TopNavigator,
  Latest: LatestNavigator,
  Settings: SettingsNavigator,
})

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { TopNavigator, LatestNavigator, SettingsNavigator } from './stack'

export const MaterialBottomTabNavigator = createMaterialBottomTabNavigator({
  Top: TopNavigator,
  Latest: LatestNavigator,
  Settings: SettingsNavigator,
})

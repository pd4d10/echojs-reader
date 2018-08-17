import { BottomTabNavigator, DrawerNavigator } from './navigators'
// import NavigatorMaterialBottomTab from './navigators/material-bottom-tab'

export const STORAGE_KEYS = {
  auth: 'auth',
  username: 'username',
  layout: 'layout',
  theme: 'theme',
  openInBrowser: 'open-in-browser',
}

export const layoutMapping = {
  'bottom-tab': {
    name: 'Bottom Tab',
    component: BottomTabNavigator,
  },
  // 'material-bottom-tab': {
  //   name: 'Material Bottom Tab',
  //   component: NavigatorMaterialBottomTab,
  // },
  drawer: {
    name: 'Drawer',
    component: DrawerNavigator,
  },
}

// undefined means use default value
export const themeMapping = {
  echojs: {
    name: 'EchoJS',
    header: {
      statusBarStyle: 'light-content',
      text: '#fff',
      background: '#af1d1d',
    },
    content: {
      title: '#000',
      url: '#999',
      user: '#666',
      border: '#eee',
      background: '#fff',
      icon: '#444',
      loading: '#af1d1d',
      digg: '#af1d1d',
    },
    tab: {
      active: '#af1d1d',
      inactive: '#888',
      activeBackground: undefined,
      inactiveBackground: undefined,
    },
    drawer: {
      active: '#af1d1d',
      inactive: '#444',
      activeBackground: undefined,
      inactiveBackground: undefined,
    },
    safari: {
      statusBarStyle: 'dark-content',
      text: '#af1d1d',
      background: undefined,
    },
    settings: {
      background: undefined,
      active: '#af1d1d',
      androidSwitchActiveBackground: '#faa',
    },
  },
  light: {
    name: 'Light',
    header: {
      statusBarStyle: 'dark-content',
      text: undefined,
      background: undefined,
    },
    content: {
      title: '#000',
      url: '#999',
      user: '#666',
      border: '#eee',
      background: '#fff',
      icon: '#222',
      loading: '#aaa',
      digg: '#007aff',
    },
    tab: {
      active: '#007aff',
      inactive: '#888',
      activeBackground: undefined,
      inactiveBackground: undefined,
    },
    drawer: {
      active: '#007aff',
      inactive: '#444',
      activeBackground: undefined,
      inactiveBackground: undefined,
    },
    safari: {
      statusBarStyle: 'dark-content',
      text: undefined,
      background: undefined,
    },
    settings: {
      background: undefined,
      active: '#007aff',
      androidSwitchActiveBackground: '#adf',
    },
  },
  // dark: {
  //   name: 'Dark',
  //   header: {
  //     statusBarStyle: 'light-content',
  //     text: '#aaa',
  //     background: '#222',
  //   },
  //   content: {
  //     title: '#00f',
  //     url: '#aaa',
  //     user: '#aaa',
  //     border: '#aaa',
  //     background: '#222',
  //     icon: '#aaa',
  //     loading: '#fff',
  //     digg: '#007aff',
  //   },
  //   tab: {
  //     active: '#007aff',
  //     inactive: '#888',
  //     activeBackground: undefined,
  //     inactiveBackground: undefined,
  //   },
  //   drawer: {
  //     active: '#007aff',
  //     inactive: '#444',
  //     activeBackground: undefined,
  //     inactiveBackground: undefined,
  //   },
  //   safari: {
  //     statusBarStyle: 'dark-content',
  //     text: undefined,
  //     background: undefined,
  //   },
  //   settings: {
  //     background: '#222',
  //     active: '#007aff',
  //     androidSwitchActiveBackground: '#adf',
  //   },
  // },
}

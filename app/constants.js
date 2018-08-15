import createBottomTab from './navigators/bottom-tab'
import createDrawer from './navigators/drawer'
// import NavigatorMaterialBottomTab from './navigators/material-bottom-tab'

export const STORAGE_KEYS = {
  auth: 'echojs-auth',
  layout: 'layout',
  theme: 'theme',
}

export const layoutMapping = {
  'bottom-tab': {
    name: 'Bottom Tab',
    factory: createBottomTab,
  },
  // 'material-bottom-tab': {
  //   name: 'Material Bottom Tab',
  //   component: NavigatorMaterialBottomTab,
  // },
  drawer: {
    name: 'Drawer',
    factory: createDrawer,
  },
}

// undefined means use default value
export const themeMapping = {
  light: {
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
    },
    tab: {
      active: undefined,
      inactive: undefined,
      background: undefined,
    },
    drawer: {
      active: undefined,
      inactive: undefined,
      background: undefined,
    },
  },
  echojs: {
    header: {
      statusBarStyle: 'light-content',
      text: '#fff',
      background: '#af1d1d',
    },
    content: {
      title: '#000',
      url: '#999',
      user: '#666',
      border: '#fee',
      background: '#fff',
      icon: '#222',
      loading: '#af1d1d',
    },
    tab: {
      active: '#af1d1d',
      inactive: '#888',
      background: undefined,
    },
    drawer: {
      active: '#af1d1d',
      inactive: undefined,
      background: undefined,
    },
  },
  dark: {
    header: {
      statusBarStyle: 'light-content',
      text: '#aaa',
      background: '#222',
    },
    content: {
      title: '#00f',
      url: '#aaa',
      user: '#aaa',
      border: '#aaa',
      background: '#222',
      icon: '#aaa',
      loading: '#fff',
    },
    tab: {
      active: '#aaa',
      inactive: '#222',
      background: '#000',
    },
    drawer: {
      active: '#af1d1d',
      inactive: undefined,
      background: undefined,
    },
  },
}

export const STORAGE_KEYS = {
  auth: "auth",
  username: "username",
  secret: "secret",
  theme: "theme",
  safariView: "safariView",
};

// undefined means use default value
export const themeMapping = {
  light: {
    name: "Light",

    headerStatusBar: "light-content",
    headerText: "#fff",
    headerBackground: "#af1d1d",
    headerAndroidBar: "#831616",

    contentTitle: "#000",
    contentUrl: "#999",
    contentUser: "#666",
    contentBorder: "#eee",
    contentBackground: "#fff",
    contentIcon: "#444",
    contentLoading: "#af1d1d",
    contentVoted: "#af1d1d",

    tabActive: "#af1d1d",
    tabInactive: "grey",
    tabActiveBackground: undefined,
    tabInactiveBackground: undefined,

    safariStatusBar: "dark-content",
    safariText: "#af1d1d",
    safariBackground: undefined,

    settingsBackground: undefined,
    settingsActive: "#af1d1d",
    settingsAndroidSwitchActiveBackground: "#faa",
  },
  // TODO: dark theme
};

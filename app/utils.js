import { Linking } from 'react-native'
import SafariView from 'react-native-safari-view'

// iOS try to use SafariView
// Android
export async function openUrl(url, openInWebView) {
  try {
    const isSafariViewAvailable = await SafariView.isAvailable()
    if (!isSafariViewAvailable) {
      throw new Error('No Safari View')
    }
    SafariView.show({
      url,
      // tintColor: this.props.colors.primary,
      // barTintColor: this.props.colors.content.background,
    })
  } catch (err) {
    // alert(err.message)
    Linking.openURL(url)
  }
}

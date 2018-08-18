import React from 'react'
import { AsyncStorage, Platform } from 'react-native'
import { STORAGE_KEYS } from '../constants'

const AuthContext = React.createContext()

export const AuthConsumer = AuthContext.Consumer

export class AuthProvider extends React.Component {
  state = {
    auth: null,
    username: null,
    isLoaded: false,
  }

  async componentDidMount() {
    const [[, auth], [, username]] = await AsyncStorage.multiGet([
      STORAGE_KEYS.auth,
      STORAGE_KEYS.username,
    ])
    console.log(auth, username)
    this.setState({ auth, username, isLoaded: true })
  }

  fetchWithAuth = async (url, opts = {}) => {
    const { auth } = this.state
    if (auth) {
      opts.headers = opts.headers || {}
      opts.headers.Cookie = `auth=${auth}`
    }
    const res = await fetch('https://echojs.com/api' + url, opts)
    const json = await res.json()
    if (json.status === 'err') {
      throw new Error(json.error)
    }
    return json
  }

  login = async (username, password) => {
    try {
      const { auth } = await this.fetchWithAuth(
        `/login?username=${username}&password=${password}`,
      )
      await AsyncStorage.setItem(STORAGE_KEYS.auth, auth)
      this.setState({ auth, username })
    } catch (err) {
      alert(err.message)
    }
  }

  logout = async () => {
    try {
      await this.fetchWithAuth('/logout', { method: 'POST' })
      await AsyncStorage.removeItem(STORAGE_KEYS.auth)
      this.setState({ auth: null })
    } catch (err) {
      alert(err.message)
    }
  }

  getNews = async (sort, start, count) => {
    // For slow network testing
    const json = await new Promise(resolve => {
      setTimeout(() => resolve(require('../../mock')), 1000)
    })
    return json.news.map(x => ({ ...x, id: Math.random().toString() }))

    // const { news } = await this.fetchWithAuth(
    //   `/api/getnews/${sort}/${start}/${count}`,
    // )
    // return news
  }

  getComments = async id => {
    const { comments } = await this.fetchWithAuth(`/getcomments/${id}`)
    return comments.sort((a, b) => a.ctime - b.ctime) // Sort by time
  }

  render() {
    const { auth, isLoaded, username } = this.state
    const { login, logout, getNews, getComments } = this

    return (
      isLoaded && (
        <AuthContext.Provider
          value={{
            auth,
            isLoaded,
            username,
            login,
            logout,
            getNews,
            getComments,
          }}
        >
          {this.props.children}
        </AuthContext.Provider>
      )
    )
  }
}

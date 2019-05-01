import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { STORAGE_KEYS } from '../constants'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState()
  const [username, setUsername] = React.useState()
  const [secret, setSecret] = React.useState()
  const [ready, setReady] = React.useState(false)

  const init = async () => {
    const [[, _auth], [, _username], [, _secret]] = await AsyncStorage.multiGet(
      [STORAGE_KEYS.auth, STORAGE_KEYS.username, STORAGE_KEYS.secret],
    )
    // console.log(_auth, _username, _secret)
    setAuth(_auth)
    setUsername(_username)
    setSecret(_secret)
    setReady(true)
  }

  React.useEffect(() => {
    init()
  }, [])

  const fetchWithAuth = async (url, opts = {}) => {
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

  const login = async (username, password) => {
    const { auth, secret } = await fetchWithAuth(
      `/login?username=${username}&password=${password}`,
    )
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.auth, auth],
      [STORAGE_KEYS.username, username],
      [STORAGE_KEYS.secret, secret],
    ])
    setAuth(auth)
    setUsername(username)
    setSecret(secret)
  }

  const createAccount = async (username, password) => {
    const { auth, secret } = await fetchWithAuth(
      `/create_account?username=${username}&password=${password}`,
      { method: 'POST' },
    )
    // Seems EchoJS's create account API does not return secret
    // So don't use any data from this API
    // Just create account and call login API again to login
  }

  const logout = async () => {
    try {
      await fetchWithAuth(`/logout?secret=${secret}`, {
        method: 'POST',
      })
    } catch (err) {
    } finally {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.auth,
        STORAGE_KEYS.username,
        STORAGE_KEYS.secret,
      ])
      setAuth(null)
      setUsername(null)
      setSecret(null)
    }
  }

  return (
    ready && (
      <AuthContext.Provider
        value={{
          auth,
          ready,
          username,
          login,
          createAccount,
          logout,
          fetchWithAuth,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  )
}

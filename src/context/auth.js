import React from "react";
import { STORAGE_KEYS } from "../constants";
import { storage } from "../Storage.bs";

export const fetchWithAuth = async (
  ctx,
  /** @type string */ url,
  opts = {}
) => {
  if (ctx.auth) {
    opts.headers = opts.headers || {};
    opts.headers.Cookie = `auth=${ctx.auth}`;
  }
  const res = await fetch("https://echojs.com/api" + url, opts);
  const json = await res.json();
  if (json.status === "err") {
    throw new Error(json.error);
  }
  return json;
};

export const login = async (ctx, _username, password) => {
  const json = await fetchWithAuth(
    ctx,
    `/login?username=${_username}&password=${password}`
  );
  await storage.multiSet([
    [STORAGE_KEYS.auth, json.auth],
    [STORAGE_KEYS.username, _username],
    [STORAGE_KEYS.secret, json.apisecret],
  ]);
  ctx.setAuth(json.auth);
  ctx.setUsername(_username);
  ctx.setSecret(json.apisecret);
};

export const createAccount = async (ctx, _username, password) => {
  await fetchWithAuth(
    ctx,
    `/create_account?username=${_username}&password=${password}`,
    { method: "POST" }
  );
  // Seems EchoJS's create account API does not return secret
  // So don't use any data from this API
  // Just create account and call login API again to login
};

export const logout = async (ctx) => {
  try {
    await fetchWithAuth(ctx, `/logout?apisecret=${ctx.secret}`, {
      method: "POST",
    });
  } catch (err) {
  } finally {
    await storage.multiRemove([
      STORAGE_KEYS.auth,
      STORAGE_KEYS.username,
      STORAGE_KEYS.secret,
    ]);
    ctx.setAuth(null);
    ctx.setUsername(null);
    ctx.setSecret(null);
  }
};

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState();
  const [username, setUsername] = React.useState();
  const [secret, setSecret] = React.useState();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      // For debugging
      const all = await storage.multiGet(await storage.getAllKeys());
      console.log(JSON.stringify(all, null, 2));

      const [[, _auth], [, _username], [, _secret]] = await storage.multiGet([
        STORAGE_KEYS.auth,
        STORAGE_KEYS.username,
        STORAGE_KEYS.secret,
      ]);
      // console.log(_auth, _username, _secret)
      setAuth(_auth);
      setUsername(_username);
      setSecret(_secret);
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        username,
        secret,
        ready,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

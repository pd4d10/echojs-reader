type state = {
  auth: string,
  username: string,
  secret: string,
}

let initialState = None

type action = Update({auth: string, username: string, secret: string}) | Drop

let reducer = (_state, action) =>
  switch action {
  | Update({auth, username, secret}) =>
    {
      auth,
      username,
      secret,
    }->Some
  | Drop => None
  }

type value = {state: option<state>, dispatch: action => unit}

let context = React.createContext({state: initialState, dispatch: _ => ()})

let fetchWithAuth = async (ctx, url, method) => {
  open Webapi.Fetch
  let cookie = ctx.state->Option.map(state => `auth=${state.auth}`)
  let method_ = switch method {
  | #post => Webapi.Fetch.Post
  | #get | _ => Webapi.Fetch.Get
  }
  let headers = HeadersInit.make({"Cookie": cookie})
  let init = RequestInit.make(~method_, ~headers, ())

  Js.log3("req:", url, method)
  let res = await fetchWithInit("https://echojs.com/api" ++ url, init)
  let json = await res->Response.json
  Js.log2("res:", json)

  // TODO:
  // if (json.status === "err") {
  //   throw new Error(json.error);
  // }
  json
}

let createAccount = async (ctx, ~username, ~password) => {
  let _json =
    await ctx->fetchWithAuth(`/create_account?username=${username}&password=${password}`, #post)
  // Seems EchoJS's create account API does not return secret
  // So don't use any data from this API
  // Just create account and call login API again to login
}

let login = async (ctx, ~username, ~password) => {
  let json = await ctx->fetchWithAuth(`/login?username=${username}&password=${password}`, #get)
  let data = json->Model.Api.login_decode->Result.getExn
  await Storage.storage.multiSet([
    (#auth, data.auth),
    (#username, username),
    (#secret, data.apisecret),
  ])
  Update({auth: data.auth, username, secret: data.apisecret})->ctx.dispatch
}

let logout = async ctx => {
  switch ctx.state {
  | None => ()
  | Some(state) => {
      let _json = await ctx->fetchWithAuth(`/logout?apisecret=${state.secret}`, #post)
      await Storage.storage.multiRemove([#auth, #username, #secret])
      Drop->ctx.dispatch
    }
  }
}

module Provider = {
  @react.component
  let make = (~children) => {
    let (state, dispatch) = React.useReducer(reducer, initialState)

    context
    ->React.Context.provider
    ->React.createElement({"value": {state, dispatch}, "children": children})
  }
}

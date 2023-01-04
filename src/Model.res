type rec comment = {
  username: string,
  ctime: string,
  body: string,
  up?: int,
  down?: int,
  voted: string,
  replies?: array<comment>,
}

type post = {
  comments: string,
  ctime: string,
  down?: string,
  id: string,
  title: string,
  up?: string,
  url: string,
  username: string,
  voted?: [#up | #down],
}

module Api = {
  @spice
  type login = {
    auth: string,
    apisecret: string,
  }
}

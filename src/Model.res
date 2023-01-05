type rec comment = {
  body: string,
  ctime: float,
  replies: array<comment>,
  up: int,
  username: string,
  down?: int,
}

type post = {
  comments: string,
  ctime: string,
  down: string,
  id: string,
  title: string,
  up: string,
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

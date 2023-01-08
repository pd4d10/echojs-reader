@spice
type rec comment = {
  body: string,
  ctime: float,
  replies: array<comment>,
  up: int,
  username: string,
  down?: int,
}

@spice
type post = {
  comments: string,
  ctime: string,
  down: string,
  id: string,
  title: string,
  up: string,
  url: string,
  username: string,
  voted?: string, // TODO: [#up | #down],
  del?: bool,
}

module Api = {
  @spice
  type login = {
    auth: string,
    apisecret: string,
  }

  @spice
  type comments = {comments: array<comment>}

  @spice
  type posts = {news: array<post>}
}

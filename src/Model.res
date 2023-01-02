type rec comment = {
  username: string,
  ctime: string,
  body: string,
  up?: int,
  down?: int,
  voted: string,
  replies?: array<comment>,
}

module Api = {
  @spice
  type login = {
    auth: string,
    apisecret: string,
  }
}

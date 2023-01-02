type rec comment = {
  username: string,
  ctime: string,
  body: string,
  up?: int,
  down?: int,
  voted: string,
  replies?: array<comment>,
}

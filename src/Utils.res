let getHostFromUrl = url => {
  url
  ->String.replaceRegExp(Re.fromString("^.*?\/\/"), "")
  ->String.split("/")
  ->Array.get(0)
  ->Option.getWithDefault("")
}

@module("date-fns")
external formatDistance: (. float, float) => string = "formatDistance"

let timeAgo = timestamp => {
  formatDistance(. timestamp *. 1000., Date.now())
}

let getHostFromUrl = url => {
  url
  ->Js.String2.replaceByRe(Js.Re.fromString("^.*?\/\/"), "")
  ->Js.String2.split("/")
  ->Array.get(0)
  ->Option.getWithDefault("")
}

@module("date-fns")
external formatDistance: (. float, float) => string = "formatDistance"

let timeAgo = timestamp => {
  formatDistance(. timestamp *. 1000., Js.Date.now())
}

type key = [#auth | #username | #secret | #theme | @deprecated #safariView]

type storage<'a> = {
  getItem: (. key) => promise<option<'a>>,
  setItem: (. key, 'a) => promise<unit>,
  multiGet: array<key> => promise<array<array<'a>>>,
  multiSet: array<(key, 'a)> => promise<unit>,
  multiRemove: array<key> => promise<unit>,
  getAllKeys: unit => promise<array<'a>>,
}

@module("@react-native-async-storage/async-storage")
external storage: storage<'a> = "default"

let storage = storage

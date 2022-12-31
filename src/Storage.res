type key = [#auth | #username | #secret | #theme | #safariView]

type storage = {
  getItem: (. key) => promise<option<string>>,
  setItem: (. key, string) => promise<unit>,
  multiGet: array<key> => promise<array<array<string>>>,
  multiSet: array<(key, string)> => promise<unit>,
  multiRemove: array<key> => promise<unit>,
  getAllKeys: unit => promise<array<string>>,
}

@module("@react-native-async-storage/async-storage")
external storage: storage = "default"

let storage = storage

open ReactNative

@react.component
let make = (~sort) => {
  let {colors} = Theme.context->React.useContext->Option.getExn
  let auth = Auth.context->React.useContext

  let (first, setFirst) = React.useState(() => false)
  let (refreshing, setRefreshing) = React.useState(() => false)
  let (loadingMore, setLoadingMore) = React.useState(() => false)
  let (items, setItems) = React.useState(() => [])
  let (end, setEnd) = React.useState(() => false)

  let pageSize = 30
  let fetchData = async (~anchor=0, ()) => {
    let json =
      await auth->Auth.fetch(
        `/getnews/${sort}/${anchor->Int.toString}/${pageSize->Int.toString}`,
        #get,
      )
    let {news} = json->Model.Api.posts_decode->Result.getExn
    news
  }

  React.useEffect0(() => {
    let init = async () => {
      setFirst(_ => true)
      let items = await fetchData()
      setItems(_ => items)
      setEnd(_ => items->Belt.Array.length < pageSize)
      setFirst(_ => false)
    }
    init()->ignore

    None
  })

  <View
    style={Style.viewStyle(
      ~backgroundColor=colors.contentBackground,
      ~flex=1.,
      ~justifyContent=#center,
      (),
    )}>
    {switch first {
    | true => <Loading size=ActivityIndicator.Size.large />
    | false =>
      <FlatList
        data=items
        renderItem={({item}) => {
          switch item.del {
          | Some(true) =>
            <View style={Style.viewStyle(~padding=10.->Style.dp, ())}>
              <Text style={Style.textStyle(~color=colors.contentUser, ~fontSize=16., ())}>
                {"[deleted news]"->React.string}
              </Text>
            </View>
          | _ =>
            <PostItem
              item
              updateVote={(id, type_) => {
                let newItems = items->Belt.Array.map(item => {
                  if item.id == id {
                    switch type_ {
                    | "up" => {
                        ...item,
                        up: (item.up->Int.fromString->Option.getExn + 1)->Int.toString,
                      }
                    | "down" => {
                        ...item,
                        down: (item.down->Int.fromString->Option.getExn + 1)->Int.toString,
                      }
                    | _ => assert false
                    }
                  } else {
                    item
                  }
                })
                setItems(_ => newItems)
              }}
            />
          }
        }}
        keyExtractor={(item, _) => item.id}
        \"ItemSeparatorComponent"={_ =>
          <View
            style={Style.viewStyle(~height=1.->Style.dp, ~backgroundColor=colors.contentBorder, ())}
          />}
        refreshing
        onRefresh={_ => {
          switch refreshing {
          | true => ()
          | false => {
              let refresh = async () => {
                setRefreshing(_ => true)
                let items = await fetchData()
                setItems(_ => items)
                setEnd(_ => items->Belt.Array.length < pageSize)
                setRefreshing(_ => false)
              }

              refresh()->ignore
            }
          }
        }}
        onEndReached={_ => {
          switch loadingMore || end {
          | true => ()
          | false => {
              let loadMore = async () => {
                setLoadingMore(_ => true)

                let newItems = await fetchData(~anchor=items->Array.length, ())
                // remove duplicated items
                let ids = items->Array.map(item => item.id)->Set.fromArray
                let newItems = newItems->Array.filter(item => !Set.has(ids, item.id))

                setItems(_ => items->Array.concat(newItems))
                setEnd(_ => newItems->Array.length < pageSize)
                setLoadingMore(_ => false)
              }

              loadMore()->ignore
            }
          }
        }}
        onEndReachedThreshold=0.1
        \"ListFooterComponent"={_ =>
          <View
            style={Style.viewStyle(
              ~paddingVertical=20.->Style.dp,
              ~height=56.->Style.dp,
              ~borderTopWidth=1.,
              ~borderColor=colors.contentBorder,
              ~alignItems=#center,
              (),
            )}>
            {switch loadingMore {
            | true => <Loading />
            | false => end ? <View /> : React.null
            }}
          </View>}
      />
    }}
  </View>
}

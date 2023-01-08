open ReactNative

module M = {
  type params = Model.post
  type options
}

module Navigation = ReactNavigation.Core.NavigationScreenProp(M)

@react.component
let make = (~item: Model.post, ~hascommentlink=true, ~updateVote) => {
  let navigation = ReactNavigation.Native.useNavigation()->Js.Nullable.toOption
  let auth = React.useContext(AuthContext.context)
  let theme = React.useContext(ThemeContext.context)->Option.getExn
  let actionSheet = Expo.ActionSheet.useActionSheet()

  let isText = item.url->Js.String2.startsWith("text://")

  <View style={Style.viewStyle(~flexDirection=#row, ~padding=10.->Style.dp, ())}>
    <View style={Style.viewStyle(~flex=1., ())}>
      <TouchableOpacity
        onPress={_ => {
          if isText {
            navigation->Option.forEach(navigation => {
              navigation->Navigation.navigateWithParams("Detail", item)
            })
          } else {
            Expo.WebBrowser.openBrowserAsync(item.url, ())->ignore
          }
        }}>
        <Text
          style={Style.textStyle(
            ~fontSize=18.,
            ~lineHeight=22.,
            ~color=theme.colors.contentTitle,
            ~marginBottom=6.->Style.dp,
            (),
          )}>
          {item.title->React.string}
        </Text>
        {switch isText {
        | true => React.null
        | false =>
          <Text
            style={Style.textStyle(
              ~color=theme.colors.contentUrl,
              ~fontSize=12.,
              ~marginBottom=6.->Style.dp,
              (),
            )}>
            {
              let host = item.url->Utils.getHostFromUrl
              `at ${host}`->React.string
            }
          </Text>
        }}
      </TouchableOpacity>
      <Text style={Style.textStyle(~color=theme.colors.contentUser, ())}>
        <Nickname name=item.username />
        {switch item.ctime->Float.fromString {
        | Some(ctime) => ` | ${ctime->Utils.timeAgo} ago`->React.string
        | None => React.null
        }}
      </Text>
    </View>
    {if hascommentlink {
      <View
        style={Style.viewStyle(
          ~justifyContent=#"space-between",
          ~width=44.->Style.dp,
          ~marginTop=2.->Style.dp,
          ~paddingLeft=10.->Style.dp,
          (),
        )}>
        <TouchableOpacity
          onPress={_ => {
            switch auth.state {
            | Some(state) =>
              switch item.voted {
              | Some(voted) => ReactNative.Alert.alert(~title=`You already vote ${voted}`, ())
              | _ =>
                actionSheet.showActionSheetWithOptions(.
                  {
                    title: `Vote for ${item.username}'s post`,
                    options: ["Up", "Down", "cancel"],
                    cancelButtonIndex: 2,
                  },
                  ~callback=index => {
                    let vote = async () => {
                      let type_ = switch index {
                      | 0 => "up"
                      | 1 => "down"
                      | _ => assert false
                      }

                      let _ =
                        await auth->AuthContext.fetchWithAuth(
                          `/votenews?news_id=${item.id}&vote_type=${type_}&apisecret=${state.secret}`,
                          #post,
                        )
                      ReactNative.Alert.alert(~title="Vote succeed", ())

                      updateVote(item.id, type_)
                    }

                    vote()->ignore
                  },
                )
              }

            | None =>
              navigation->Option.forEach(navigation => {
                navigation->Navigation.navigate("Login")
              })
            }
          }}>
          {
            let up = item.up->Int.fromString->Option.getWithDefault(0)
            let down = item.down->Int.fromString->Option.getWithDefault(0)
            <Vote up down voted=None />
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.viewStyle(~flex=1., ~justifyContent=#"flex-end", ())}
          onPress={_ => {
            navigation->Option.forEach(navigation => {
              navigation->Navigation.navigateWithParams("Detail", item)
            })
          }}>
          <View style={Style.viewStyle(~flexDirection=#row, ())}>
            <Expo.VectorIcons.MaterialCommunityIcons
              name="comment-text-outline"
              size=14
              style={switch Platform.os {
              | #android => Style.viewStyle(~marginRight=3.->Style.dp, ~marginTop=3.->Style.dp, ())
              | #ios | _ => Style.viewStyle(~marginRight=2.->Style.dp, ~marginTop=2.->Style.dp, ())
              }}
            />
            <Text style={Style.textStyle(~color=theme.colors.contentIcon, ())}>
              {item.comments->React.string}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    } else {
      React.null
    }}
  </View>
}

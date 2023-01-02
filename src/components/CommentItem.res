open ReactNative

@module("date-fns")
external formatDistance: (. int, int) => string = "formatDistance"

@react.component
let rec make = (~item: Model.comment, ~level) => {
  let marginLeft = level->Float.fromInt *. 20.
  let theme = ThemeContext.context->React.useContext->Option.getExn

  let timeago = formatDistance(.
    item.ctime->Int.fromString->Option.getExn * 1000,
    Js.Date.now()->Int.fromFloat,
  )

  <>
    <View
      style={Style.viewStyle(
        ~flexDirection=#row,
        ~padding=10.->Style.dp,
        ~marginLeft=marginLeft->Style.dp,
        // borderTopColor: colors.contentBorder,
        // borderTopWidth: this.props.index === 0 ? 0 : 1,
        (),
      )}>
      <View style={Style.viewStyle(~flex=1., ())}>
        <Text
          style={Style.textStyle(~color=theme.colors.contentUser, ~marginBottom=4.->Style.dp, ())}>
          <Nickname name={item.username} />
          {`| ${timeago} ago`->React.string}
        </Text>
        <Text style={Style.textStyle(~color=theme.colors.contentTitle, ())}>
          {item.body->React.string}
        </Text>
      </View>
      <View
        style={Style.viewStyle(
          ~justifyContent=#"space-between",
          ~width=44.->Style.dp,
          ~marginTop=2.->Style.dp,
          ~paddingLeft=10.->Style.dp,
          (),
        )}>
        <Vote item />
      </View>
    </View>
    {item.replies
    ->Option.getWithDefault([])
    ->Array.map(reply =>
      make->React.createElement({
        // "key": reply.ctime + reply.username,
        "item": reply,
        "level": level + 1,
      })
    )
    ->React.array}
  </>
}

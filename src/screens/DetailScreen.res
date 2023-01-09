open ReactNative

@react.component
let make = (~navigation as _, ~route as _) => {
  let route = ReactNavigation.Native.useRoute()->Js.Nullable.toOption->Option.getExn
  let params: Model.post = route.params->Option.getExn

  let theme = Theme.context->React.useContext->Option.getExn
  let auth = Auth.context->React.useContext

  let (loading, setLoading) = React.useState(_ => false)
  let (comments, setComments) = React.useState(_ => [])

  React.useEffect0(() => {
    let init = async () => {
      try {
        setLoading(_ => true)
        // let id = "22273"
        let id = params.id
        let json = await auth->Auth.fetch(`/getcomments/${id}`, #get)
        let {comments} = json->Model.Api.comments_decode->Result.getExn
        setComments(_ =>
          comments->Js.Array2.sortInPlaceWith((a, b) => a.ctime->Float.toInt - b.ctime->Float.toInt)
        )
        setLoading(_ => false)
      } catch {
      | Js.Exn.Error(obj) => setLoading(_ => false)
      // TODO:
      }
    }

    init()->ignore

    None
  })

  <ScrollView
    style={Style.viewStyle(
      ~backgroundColor=theme.colors.contentBackground,
      ~padding=4.->Style.dp,
      (),
    )}>
    <PostItem
      item=params
      hascommentlink=false
      updateVote={(id, type_) => {
        ()
      }}
    />
    <View
      style={Style.viewStyle(
        ~borderBottomColor=theme.colors.contentBorder,
        ~borderBottomWidth=8.,
        (),
      )}
    />
    {if loading {
      <Loading style={Style.viewStyle(~marginTop=10.->Style.dp, ())} />
    } else {
      comments
      ->Array.map(comment => {
        <CommentItem key={comment.ctime->Float.toString ++ comment.username} item=comment level=0 />
      })
      ->React.array
    }}
  </ScrollView>
}

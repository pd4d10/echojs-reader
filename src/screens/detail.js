import React from "react";
import { View, ScrollView } from "react-native";
import { make as Loading } from "../components/Loading.bs";
import { context as ThemeContext } from "../ThemeContext.bs";

import { PostItem } from "../components/post";
import { make as CommentItem } from "../components/CommentItem.bs";
import { handleError } from "../utils";
import { context as AuthContext, fetchWithAuth } from "../AuthContext.bs";
import { useNavigation } from "@react-navigation/native";

export const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = React.useContext(ThemeContext);
  const authCtx = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const id = route.params.id;
        // const id = 22273
        const json = await fetchWithAuth(authCtx, `/getcomments/${id}`);
        setComments(json.comments.sort((a, b) => a.ctime - b.ctime)); // Sort by time
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigation]);

  return (
    <ScrollView
      style={{
        backgroundColor: colors.contentBackground,
        padding: 4,
      }}
    >
      <PostItem item={route.params} hasCommentLink={false} />
      <View
        style={{
          borderBottomColor: colors.contentBorder,
          borderBottomWidth: 8,
        }}
      />
      {loading ? (
        <Loading style={{ marginTop: 10 }} />
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.ctime + comment.username}
            item={comment}
            level={0}
          />
        ))
      )}
    </ScrollView>
  );
};

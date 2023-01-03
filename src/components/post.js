import React from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { formatDistance } from "date-fns";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { context as ThemeContext } from "../ThemeContext.bs";

import { make as Vote } from "./Vote.bs";
import { getHostFromUrl, openLink } from "../utils";
import { make as Nickname } from "./Nickname.bs";
import { context as AuthContext, fetchWithAuth } from "../AuthContext.bs";
import { useNavigation } from "@react-navigation/native";

export const PostItem = React.memo((props) => {
  const navigation = useNavigation();
  const authCtx = React.useContext(AuthContext);

  const { colors } = React.useContext(ThemeContext);

  const { showActionSheetWithOptions } = useActionSheet();

  const vote = async (id, type) => {
    await fetchWithAuth(
      authCtx,
      `/votenews?news_id=${id}&vote_type=${type}&apisecret=${authCtx.state?.secret}`,
      {
        method: "POST",
      }
    );
    alert("Vote succeed");
  };

  const isText = React.useCallback(() => {
    return props.item.url.startsWith("text://");
  }, [props.item]);

  const now = Date.now();
  const { item, hasCommentLink = true } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={async () => {
            if (isText()) {
              navigation.navigate("Detail", item);
              return;
            }

            openLink(item.url);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 22,
              color: colors.contentTitle,
              marginBottom: 6,
            }}
          >
            {item.title}
          </Text>
          {isText() || (
            <Text
              style={{
                color: colors.contentUrl,
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              at {getHostFromUrl(item.url)}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={{ color: colors.contentUser }}>
          <Nickname name={item.username} /> |{" "}
          {formatDistance(parseInt(item.ctime, 10) * 1000, now)} ago
        </Text>
      </View>

      {hasCommentLink && (
        <View
          style={{
            justifyContent: "space-between",
            width: 44,
            marginTop: 2,
            paddingLeft: 10,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              if (!authCtx.state) {
                navigation.navigate("Login");
                return;
              }

              if (item.voted) {
                alert(`You already vote ${item.voted}`);
                return;
              }

              showActionSheetWithOptions(
                {
                  title: `Vote for ${item.username}'s post`,
                  options: ["Up", "Down", "cancel"],
                  cancelButtonIndex: 2,
                },
                async (index) => {
                  try {
                    switch (index) {
                      case 0:
                        await vote(item.id, "up");
                        props.updateVote(item.id, "up");
                        break;
                      case 1:
                        await vote(item.id, "down");
                        props.updateVote(item.id, "down");
                        break;
                    }
                  } catch (err) {
                    alert(err.message);
                  }
                }
              );
            }}
          >
            <Vote colors={colors} item={item} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "flex-end" }}
            onPress={() => navigation.navigate("Detail", { ...item })}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={14}
                style={Platform.select({
                  ios: { marginRight: 2, marginTop: 2 },
                  android: { marginRight: 3, marginTop: 3 },
                })}
                color={colors.contentIcon}
              />
              <Text style={{ color: colors.contentIcon }}>{item.comments}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

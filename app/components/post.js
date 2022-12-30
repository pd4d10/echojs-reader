import React from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { formatDistance } from "date-fns";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ActionSheet from "react-native-actionsheet";
import { ThemeContext } from "../context/theme";
import { Vote } from "./vote";
import { getHostFromUrl } from "../utils";
import { Nickname } from "./nickname";
import { SettingsContext } from "../context/settings";
import { AuthContext } from "../context/auth";

export const PostItem = React.memo((props) => {
  const { auth, secret, fetchWithAuth } = React.useContext(AuthContext);
  const { openLink } = React.useContext(SettingsContext);
  const { colors } = React.useContext(ThemeContext);

  const [actionSheet, setActionSheet] = React.useState(null);

  const vote = React.useCallback(
    async (id, type) => {
      await fetchWithAuth(
        `/votenews?news_id=${id}&vote_type=${type}&apisecret=${secret}`,
        {
          method: "POST",
        }
      );
      alert("Vote succeed");
    },
    [fetchWithAuth, secret]
  );

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
              props.navigation.navigate("Detail", item);
              return;
            }

            openLink(item.url, colors);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 22,
              color: colors.content.title,
              marginBottom: 6,
            }}
          >
            {item.title}
          </Text>
          {isText() || (
            <Text
              style={{
                color: colors.content.url,
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              at {getHostFromUrl(item.url)}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={{ color: colors.content.user }}>
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
              if (!auth) {
                props.navigation.navigate("Login");
                return;
              }

              if (item.voted) {
                alert(`You already vote ${item.voted}`);
                return;
              }

              actionSheet.show();
            }}
          >
            <Vote colors={colors} item={item} />
            <ActionSheet
              ref={(el) => {
                setActionSheet(el);
              }}
              title={`Vote for ${item.username}'s post`}
              options={["Up", "Down", "cancel"]}
              cancelButtonIndex={2}
              onPress={async (index) => {
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
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "flex-end" }}
            onPress={() => props.navigation.navigate("Detail", { ...item })}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={14}
                style={Platform.select({
                  ios: { marginRight: 2, marginTop: 2 },
                  android: { marginRight: 3, marginTop: 3 },
                })}
                color={colors.content.icon}
              />
              <Text style={{ color: colors.content.icon }}>
                {item.comments}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

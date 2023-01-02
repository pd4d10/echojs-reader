import React from "react";
import { Text, View, FlatList } from "react-native";
import { context as ThemeContext } from "../ThemeContext.bs";

import { make as Loading } from "../components/Loading.bs";
import { PostItem } from "../components/post";
import { handleError } from "../utils";
import { context as AuthContext, fetchWithAuth } from "../AuthContext.bs";

const PAGE_SIZE = 30;

const List = ({ sort }) => {
  const { colors } = React.useContext(ThemeContext);
  const authCtx = React.useContext(AuthContext);

  const [first, setFirst] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [end, setEnd] = React.useState(false);

  const fetchData = React.useCallback(
    async (anchor = 0) => {
      // // For slow network testing
      // const json = await new Promise(resolve => {
      //   setTimeout(() => resolve(require('../../mock')), 1000)
      // })
      // return json.news.map(x => ({ ...x, id: Math.random().toString() }))

      const { news } = await fetchWithAuth(
        authCtx,
        `/getnews/${sort}/${anchor}/${PAGE_SIZE}`
      );
      return news;
    },
    [sort]
  );

  React.useEffect(() => {
    (async () => {
      try {
        setFirst(true);
        const _items = await fetchData();
        setItems(_items);
        setEnd(_items.length < PAGE_SIZE);
      } catch (err) {
        handleError(err);
      } finally {
        setFirst(false);
      }
    })();
  }, [fetchData]);

  const updateVote = React.useCallback((id, type) => {
    setItems((v) =>
      v.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            voted: type,
            up: type === "up" ? parseInt(item.up, 10) + 1 : item.up,
            down: type === "down" ? parseInt(item.down, 10) + 1 : item.down,
          };
        } else {
          return item;
        }
      })
    );
  }, []);

  const handleRefresh = async () => {
    if (refreshing) {
      return;
    }

    try {
      setRefreshing(true);
      const _items = await fetchData();
      setItems(_items);
      setEnd(_items.length < PAGE_SIZE);
      // Toast.show({
      //   text: 'Refresh success',
      //   position: 'top',
      //   duration: 2000,
      // })
    } catch (err) {
      handleError(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || end) {
      return;
    }
    try {
      setLoadingMore(true);
      let _items = await fetchData(items.length);
      setEnd(_items.length < PAGE_SIZE);

      // Remove duplicated items
      const idMapper = items.reduce(
        (obj, item) => ({ ...obj, [item.id]: true }),
        {}
      );
      // console.log(idMapper)
      _items = _items.filter(({ id }) => !idMapper[id]);
      // console.log(items.length)

      setItems([...items, ..._items]);
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.contentBackground,
        flex: 1,
        justifyContent: "center",
      }}
    >
      {first ? (
        <Loading size="large" />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) =>
            item.del ? (
              <View style={{ padding: 10 }}>
                <Text style={{ color: colors.contentUser, fontSize: 16 }}>
                  [deleted news]
                </Text>
              </View>
            ) : (
              <PostItem item={item} updateVote={updateVote} />
            )
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: colors.contentBorder,
              }}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View
              style={{
                paddingVertical: 20,
                height: 56,
                borderTopWidth: 1,
                borderColor: colors.contentBorder,
                alignItems: "center",
              }}
            >
              {loadingMore ? (
                <Loading />
              ) : end ? (
                <Text>--- No more data ---</Text>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
};

export const TopScreen = (props) => <List sort="top" {...props} />;

export const LatestScreen = (props) => <List sort="latest" {...props} />;

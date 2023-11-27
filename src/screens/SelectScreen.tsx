import {FontAwesome} from "@expo/vector-icons";
import React, {useCallback, useMemo} from "react";
import {LogBox, Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import {RootStackScreenProps} from "../types";
import {Text} from "../components/Text";
import {FlashList} from "@shopify/flash-list";
import {colors, common} from "../theme";
import {useQuery} from "@apollo/client";
import {categoryToQuery} from "../categoryQueries";

// we don't use state persistence or deep link to this screen
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ListItem = React.memo(({label, isSelected, onPress, value}: {
  label: string,
  isSelected: boolean;
  onPress: (id: string, label: string) => void;
  value: string;
}) => {
  return (
    <Pressable style={[styles.item, isSelected ? styles.itemSelected : undefined,
      common.flexRow, common.justifySpaceBetween]}
               accessibilityRole={"button"} accessibilityState={{checked: isSelected}}
               onPress={() => onPress(value, label)}>
      <Text>{label}</Text>
      {isSelected ?
        <FontAwesome size={20} name={'check'} color={colors.primary[500]}/> : null}
    </Pressable>
  );
});

const ItemSeparator = React.memo(() => {
  return <View style={styles.separator}/>;
});

export default function SelectScreen(props: RootStackScreenProps<"Select">) {
  const {category, onSelect, selectedValue} = props.route.params;
  const {data, fetchMore} = useQuery(categoryToQuery[category], {variables: {first: 20}});

  const loadMore = useCallback(() => {
    if (data?.[category].pageInfo.hasNextPage) {
      fetchMore({
        variables: {after: data[category].pageInfo.endCursor},
        updateQuery: (prevResult, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prevResult;
          return {
            [category]: {
              ...fetchMoreResult[category],
              edges: [
                ...prevResult[category].edges,
                ...fetchMoreResult[category].edges,
              ],
            },
          };
        },
      });
    }
  }, [data, fetchMore, category]);

  const onPress = useCallback((value: string, label: string) => {
    onSelect({value, label});
    props.navigation.goBack();
  }, [onSelect]);

  const keyExtractor = useCallback((item) => item.id, []);
  const listData = useMemo(() => data?.[category].edges.map(edge => edge.node), [data]);
  const renderItem = useCallback(({item, index}) => {
    return <ListItem onPress={onPress}
                     isSelected={item.id === selectedValue}
                     label={item.name || item.title}
                     value={item.id}/>;
  }, [onPress, selectedValue]);

  return <SafeAreaView style={[common.screen, common.bgWhite]}>
    <FlashList renderItem={renderItem}
               data={listData} indicatorStyle={"white"}
               ItemSeparatorComponent={ItemSeparator}
               keyExtractor={keyExtractor}
               estimatedItemSize={43}
               onEndReached={loadMore}
               onEndReachedThreshold={0.5}/>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.gray[300],
  },
  item: {
    justifyContent: "center",
    ...common.px4,
    ...common.py2
  },
  itemSelected: {
    backgroundColor: colors.primary[100],
  }
});

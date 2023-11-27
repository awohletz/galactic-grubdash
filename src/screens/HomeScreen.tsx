import {RootStackScreenProps} from "../types";
import {Pressable, StyleSheet, View} from "react-native";
import {Text} from "../components/Text";
import {colors, common} from "../theme";
import {Heading} from "../components/Heading";
import {VStack} from "../components/VStack";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {FlashList} from "@shopify/flash-list";
import React, {useCallback} from "react";
import {foods} from "../foods";
import {Ionicons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";

const FoodItem = React.memo(({title, description, onPress}: {
  title: string,
  description: string;
  onPress: (title: string) => void;
}) => {
  return (
    <Pressable style={[styles.item, common.flexRow, common.justifySpaceBetween]} role={"link"}
               onPress={() => onPress(title)}>
      <VStack style={{width: "90%"}}>
        <Text bold>{title}</Text>
        <Text size={"sm"}>
          {description}
        </Text>
      </VStack>
      <Ionicons name={"chevron-forward"} size={20} color={colors.gray[500]}/>
    </Pressable>
  );
});

const ItemSeparator = React.memo(() => {
  return <View style={styles.separator}/>;
});

export default function HomeScreen(props: RootStackScreenProps<"Home">) {
  const onItemPress = useCallback((title: string) => {
    props.navigation.navigate("Order", {foodTitle: title});
  }, []);
  const renderItem = useCallback(({item}) =>
      <FoodItem title={item.title}
                description={item.description}
                onPress={onItemPress}/>,
    [onItemPress]);
  const keyExtractor = useCallback(item => item.title, []);
  const insets = useSafeAreaInsets();

  return <View style={[common.screen, common.bgWhite, {paddingBottom: insets.bottom}]}>
    <StatusBar style={"light"}/>
    <View style={[common.px4, common.bgDark, {paddingTop: insets.top}]}>
      <Heading size={"md"} style={[common.my3]} bold colorScheme={"light"}>
        Galactic GrubDash
      </Heading>
      <Text style={common.mb3} colorScheme={"light"}>
        Order your favorite grub from across the galaxy! What do you have a hankering for now?
      </Text>
    </View>

    <FlashList data={foods}
               renderItem={renderItem}
               ItemSeparatorComponent={ItemSeparator}
               estimatedItemSize={156}
               keyExtractor={keyExtractor}/>

  </View>
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.gray[300],
  },
  item: {
    backgroundColor: "white",
    justifyContent: "center",
    ...common.px4,
    ...common.py4,
  },
});

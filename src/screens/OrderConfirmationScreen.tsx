import {RootStackScreenProps} from "../types";
import {Text} from "../components/Text";
import {useQuery} from "@apollo/client";
import {common} from "../theme";
import {ActivityIndicator, ScrollView, View} from "react-native";
import {Button} from "../components/Button";
import {Ionicons} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {GET_PERSON, GET_PLANET} from "../categoryQueries";
import {VStack} from "../components/VStack";
import {LabelValueRow} from "../components/LabelValueRow";
import {find} from "lodash";
import {foods} from "../foods";


export default function OrderConfirmationScreen(props: RootStackScreenProps<"OrderConfirmation">) {
  const {foodTitle, order, deliveryMethod} = props.route.params;
  const food = find(foods, (f) => f.title === foodTitle);
  const personQuery = useQuery(GET_PERSON, {variables: {id: order.deliveryPerson}});
  const planetQuery = useQuery(GET_PLANET, {variables: {id: food.planetId}});
  const insets = useSafeAreaInsets();

  return <View style={[common.screen, common.bgWhite]}>
    <ScrollView>
      <View style={[common.pt4, common.pb6, common.px4, common.bgWhite]}>
        {personQuery.error ? <Text colorScheme={"danger"}>Error loading person data.</Text> : null}
        {planetQuery.error ? <Text colorScheme={"danger"}>Error loading planet data.</Text> : null}
        {personQuery.loading || planetQuery.loading ? <ActivityIndicator/> : null}

        {personQuery.data && planetQuery.data ?
          <VStack space={3}>
            <Text>
              You ordered <Text bold>{foodTitle}</Text> from <Text bold>{planetQuery.data.planet.name}</Text>
              . Your delivery pilot is <Text bold>{personQuery.data.person.name}</Text>.
              They will contact you at <Text bold>{order.communicator}</Text> when they arrive{
              deliveryMethod ? <Text> in their <Text bold>{deliveryMethod}</Text></Text> : null
            }.
            </Text>
            <Text>
              Here are some details about your delivery pilot to help you identify them:
            </Text>
            <LabelValueRow label={"Eye color"} value={personQuery.data.person.eyeColor}/>
            <LabelValueRow label={"Hair color"} value={personQuery.data.person.hairColor}/>
            <LabelValueRow label={"Height"} value={personQuery.data.person.height + "cm"}/>
            {personQuery.data.person.species ?
              <LabelValueRow label={"Species"} value={personQuery.data.person.species?.name}/>
              : null}

            <Text>
              May the Force be with you!
            </Text>
          </VStack>
          : null}

      </View>
    </ScrollView>
    <View style={[common.pt3, common.borderTop, common.bgDark, common.px4, {paddingBottom: Math.max(16, insets.bottom)}]}>
      <Button onPress={() => props.navigation.goBack()}
              leftIcon={(size, color) => <Ionicons size={size} name={'fast-food-outline'}
                                                   color={color}/>}
              colorScheme={"secondary"}>
        Find some more grub
      </Button>
    </View>
  </View>
}

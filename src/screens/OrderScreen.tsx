import {OrderFormValues, RootStackScreenProps} from "../types";
import {foods} from "../foods";
import {ActivityIndicator, ScrollView, TextInput, View} from "react-native";
import {Text} from "../components/Text";
import {useQuery} from "@apollo/client";
import {find, isEmpty, map} from "lodash";
import {Form} from "react-final-form";
import {common} from "../theme";
import {FormPicker} from "../components/forms/FormPicker";
import {required} from "../components/forms/formValidators";
import {VStack} from "../components/VStack";
import {FormInput} from "../components/forms/FormInput";
import {useRef, useState} from "react";
import {Button} from "../components/Button";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {FormSelect} from "../components/forms/FormSelect";
import {Ionicons} from "@expo/vector-icons";
import {GET_PERSON, GET_PLANET} from "../categoryQueries";
import Toast from "react-native-root-toast";

function getDeliveryMethod(deliveryPerson: any, fromPlanetId: string, toPlanetId: string) {
  const deliveryPersonStarships = deliveryPerson?.starshipConnection.starships ?? [];
  const deliveryPersonVehicles = deliveryPerson?.vehicleConnection.vehicles ?? [];
  const requiresInterstellarTravel = fromPlanetId !== toPlanetId;
  const starship = deliveryPersonStarships[0];
  const vehicle = deliveryPersonVehicles[0];
  return requiresInterstellarTravel ? starship : vehicle ?? starship;
}

export default function OrderScreen(props: RootStackScreenProps<"Order">) {
  const {foodTitle} = props.route.params;
  const food = find(foods, (f) => f.title === foodTitle);

  const planetQuery = useQuery(GET_PLANET, {variables: {id: food.planetId}});
  const deliveryPeople = planetQuery.data?.planet.residentConnection.residents ?? [];
  const deliveryPersonOptions = map(deliveryPeople, (p) => ({
    label: p.name,
    value: p.id
  }));

  const [isOrdering, setIsOrdering] = useState(false);
  const onSubmit = async (vals: OrderFormValues) => {
    setIsOrdering(true);
    const deliveryPerson = find(deliveryPeople, (p) => p.id === vals.deliveryPerson);

    // preload data for the confirmation screen
    try {
      await planetQuery.client.query({
        query: GET_PERSON,
        variables: {id: vals.deliveryPerson}
      });
      await planetQuery.client.query({
        query: GET_PLANET,
        variables: {id: food.planetId}
      })
    } catch (e) {
      setIsOrdering(false);
      Toast.show("Error loading data. Please try again.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }

    setIsOrdering(false);
    props.navigation.replace("OrderConfirmation", {
      foodTitle,
      order: vals,
      deliveryMethod: getDeliveryMethod(deliveryPerson, food.planetId, vals.planet.value)?.name
    })
  }

  const communicatorRef = useRef<TextInput>(null);
  const submitRef = useRef<any>(null);
  const triggerSubmit = () => {
    submitRef.current();
  }

  const initialFormValues: OrderFormValues | undefined = planetQuery.data ? {
    name: "",
    deliveryPerson: deliveryPeople?.[0]?.id,
    communicator: "",
    planet: null,
  } : undefined;
  const insets = useSafeAreaInsets();

  return <View style={[common.screen, common.bgWhite]}>
    <ScrollView>
      <View style={[common.px4, common.pt4, common.pb6]}>
        {planetQuery.error ? <Text colorScheme={"danger"}>Error loading planet data.</Text> : null}
        {planetQuery.data && isEmpty(deliveryPeople) ?
          <Text style={[common.mb4]}>
            Sorry, we don't have any delivery people available on {planetQuery.data.planet.name}.
            Please go back and choose a different food. We're working on expanding our delivery
            network to more planets!
          </Text> : null}
        {initialFormValues && !isEmpty(deliveryPeople) ?
          <Form<OrderFormValues> onSubmit={onSubmit}
                                 initialValues={initialFormValues}>
            {({handleSubmit, values, invalid}) => {
              submitRef.current = (event) => {
                if (invalid) {
                  Toast.show("Please enter a valid name, communicator number, and planet.", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                  });
                }
                return handleSubmit(event);
              };
              const deliveryPerson = find(deliveryPeople, (p) => p.id === values.deliveryPerson);
              const deliveryMethod = getDeliveryMethod(deliveryPerson, food.planetId, values.planet?.value);

              return <VStack space={3} style={common.pb4}>
                <Text>
                  You're ordering <Text bold>{food.title}</Text> from <Text bold>{planetQuery.data.planet.name}</Text>.
                </Text>

                <FormInput name={"name"} label={"Your name"}
                           autoComplete={"name"}
                           autoCapitalize={"words"}
                           autoCorrect={false}
                           autoFocus nextRef={communicatorRef}
                           placeholder={"Enter your full name"} validate={required}/>
                <FormInput name={"communicator"} label={"Your communicator number"} ref={communicatorRef}
                           keyboardType={"phone-pad"}
                           autoCorrect={false}
                           autoComplete={"tel"}
                           helpText={"We'll use this to contact you when your order is ready."}
                           placeholder={"Interplanetary communicator #"} validate={required}/>
                <FormSelect name={"planet"} label={"Your planet"} validate={required}
                            placeholder={"Select your planet"}
                            category={"allPlanets"}/>
                <FormPicker label={"Pick a delivery pilot (optional)"} name={"deliveryPerson"}
                            validate={required}
                            options={deliveryPersonOptions}/>

                {!isEmpty(deliveryMethod) ?
                  <Text>
                    {deliveryPerson?.name} will deliver your order in their <Text
                    bold>{deliveryMethod.name}</Text>.
                  </Text>
                  : null}

                <Text size={"sm"} muted>
                  Galactic GrubDash is not responsible for damage to your property from improper
                  vehicle maneuvering by our delivery pilots.
                </Text>
              </VStack>;
            }}
          </Form> :
          null
        }
        {planetQuery.loading ? <ActivityIndicator/> : null}
      </View>
    </ScrollView>
    {planetQuery.data && !isEmpty(deliveryPeople) ?
      <View
        style={[common.pt3, common.borderTop, common.bgDark, common.px4, {paddingBottom: Math.max(16, insets.bottom)}]}>
        <Button onPress={triggerSubmit} leftIcon={(size, color) => <Ionicons size={size} name={'send'}
                                                                             color={color}/>}
                isLoading={isOrdering}
                colorScheme={"primary"}>
          Place order
        </Button>
      </View> : null}
  </View>
}

import {RootStackParamList} from "./types";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import {colors} from "./theme";
import SelectScreen from "./screens/SelectScreen";
import OrderConfirmationScreen from "./screens/OrderConfirmationScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const standardHeaderStyle = {
  headerStyle: {
    backgroundColor: colors.bgDark,
  },
  headerTintColor: colors.gray[50],
}

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home"
                    options={{
                      headerShown: false,
                    }}
                    component={HomeScreen}/>

      <Stack.Screen name="Order"
                    options={{
                      title: "Place Order",
                      headerBackTitle: "Grub",
                      ...standardHeaderStyle,
                    }}
                    component={OrderScreen}/>

      <Stack.Screen name="OrderConfirmation"
                    options={{
                      title: "Order Confirmed!",
                      headerBackTitle: "Grub",
                      ...standardHeaderStyle,
                    }}
                    component={OrderConfirmationScreen}/>

      <Stack.Screen name="Select"
                    options={props => ({
                      title: props.route.params.title,
                      ...standardHeaderStyle,
                    })}
                    component={SelectScreen}/>
    </Stack.Navigator>
  );
}

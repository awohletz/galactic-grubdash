import {type NativeStackScreenProps} from "@react-navigation/native-stack";

export type Category = "allPeople" | "allPlanets" | "allFilms" | "allSpecies" | "allStarships" | "allVehicles";
export type RootStackParamList = {
  Home: undefined;
  Order: {
    foodTitle: string;
  },
  OrderConfirmation: {
    foodTitle: string;
    deliveryMethod: string;
    order: OrderFormValues;
  },
  Select: {
    title: string;
    onSelect: (value: SelectOption) => void;
    selectedValue: string;
    category: Category;
  }
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export interface SelectOption {
  label: string;
  value: string;
}


export interface OrderFormValues {
  name: string;
  communicator: string;
  deliveryPerson: string;
  planet: SelectOption;
}

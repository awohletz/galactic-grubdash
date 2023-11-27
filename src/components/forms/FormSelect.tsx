import React, {forwardRef} from 'react';
import {FieldValidator} from "final-form";
import {FormControl} from "./FormControl";
import {Category, RootStackParamList, SelectOption} from "../../types";
import {Pressable, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {NavigationProp} from "@react-navigation/core/src/types";
import {Text} from "../Text";
import {formInputStyles} from "./FormInput";
import {colors, common} from "../../theme";

export interface FormSelectProps {
  label: string;
  name: string;
  validate?: FieldValidator<any>;
  helpText?: string;
  placeholder?: string;
  isDisabled?: boolean;

  category: Category;
}

export const FormSelect = forwardRef<any, FormSelectProps>(({
                                                              label,
                                                              helpText,
                                                              placeholder,
                                                              name,
                                                              validate,
                                                              isDisabled,
                                                              category,
                                                            }, ref) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <FormControl name={name}
                 label={label}
                 helpText={helpText}
                 validate={validate}>
      {(input, meta) => {
        const onPress = () => {
          navigation.navigate("Select", {
            title: label,
            category: category,
            onSelect: (value: SelectOption) => input.onChange(value),
            selectedValue: input.value?.value,
          })
        }

        const valueLabel = input.value?.label;

        return <Pressable
          onPress={() => {
            if (isDisabled)
              return;
            onPress();
          }}>

          <View style={[common.flexRow, common.alignItemsCenter, common.justifySpaceBetween,
            meta.error && meta.submitFailed ? formInputStyles.inputError : formInputStyles.input,]}>
            <View>
              {valueLabel ?
                <Text>
                  {valueLabel}
                </Text>
                : placeholder ?
                  <Text style={{color: colors.gray[400]}}>
                    {placeholder}
                  </Text>
                  : null
              }
            </View>
            {isDisabled ? null :
              <Ionicons name={'chevron-forward'} size={20} color={colors.gray[400]}/>}
          </View>
        </Pressable>
      }}
    </FormControl>
  );
});

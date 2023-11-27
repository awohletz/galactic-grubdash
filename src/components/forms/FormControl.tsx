import React from "react";
import {Field, FieldInputProps, FieldMetaState} from "react-final-form";
import {FieldValidator} from "final-form";
import {View} from "react-native";
import {Text} from "../Text";
import {common} from "../../theme";

export interface FormInputProps {
  label?: string | React.JSX.Element;
  name: string;
  validate?: FieldValidator<any>;
  helpText?: string;
  children: (input: FieldInputProps<any, any>, meta: FieldMetaState<any>) => React.JSX.Element;
}

export const FormControl: React.FC<FormInputProps> = ({
                                                        label,
                                                        helpText,
                                                        name,
                                                        validate,
                                                        children,
                                                      }) => {

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <View>
          {label ? <Text bold style={common.mb1}>{label}</Text> : null}
          {children(input, meta)}
          {helpText ?
            <Text size={"sm"} style={common.mt1}>
              {helpText}
            </Text> : null}
          {meta.error && meta.submitFailed ?
            <Text colorScheme={"danger"} size={"sm"}>
              {meta.error}
            </Text> : null
          }
        </View>
      )}
    </Field>
  );
};

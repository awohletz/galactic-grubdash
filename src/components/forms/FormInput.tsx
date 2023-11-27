import React, {forwardRef} from "react";
import {type FieldValidator} from "final-form";
import {FormControl} from "./FormControl";
import {StyleSheet, TextInput, View} from "react-native";
import {TextInputProps} from "react-native/Libraries/Components/TextInput/TextInput";
import {colors, common, textSizeStyles} from "../../theme";

export interface FormInputProps extends TextInputProps {
  label?: string | React.JSX.Element;
  name: string;
  validate?: FieldValidator<any>;
  helpText?: string;
  variant?: string;
  leftElement?: React.JSX.Element | React.JSX.Element[];
  rightElement?: React.JSX.Element | React.JSX.Element[];
  isMultiLine?: boolean;
  format?: (value: any, name: string) => any;
  parse?: (value: any, name: string) => any;
  isNumber?: boolean;
  nextRef?: React.MutableRefObject<any>;
}

export const FormInput = forwardRef<any, FormInputProps>(
  (
    {
      label,
      helpText,
      name,
      validate,
      isNumber = false,
      placeholder,
      nextRef,
      isMultiLine,
      format,
      parse,
      returnKeyType,
      ...textInputProps
    },
    ref
  ) => {

    return (
      <FormControl name={name}
                   label={label}
                   helpText={helpText}
                   validate={validate}>
        {(input, meta) => {
          return (
            <View style={meta.error && meta.submitFailed ? formInputStyles.inputError : formInputStyles.input}>
              <TextInput
                ref={ref ?? undefined}
                multiline={isMultiLine}
                placeholder={placeholder}
                onChangeText={(text) => input.onChange(text)}
                onBlur={() => input.onBlur()}
                onFocus={() => input.onFocus()}
                onSubmitEditing={(e) => {
                  if (textInputProps?.onSubmitEditing) {
                    textInputProps.onSubmitEditing(e);
                  } else if (nextRef?.current) {
                    nextRef.current?.focus?.();
                  }
                }}
                blurOnSubmit={!Boolean(nextRef)}
                returnKeyType={returnKeyType ?? (nextRef ? "next" : "done")}
                value={input.value}
                textAlignVertical={"center"}
                style={[common.fullWidth, common.center, common.pt1, common.pb1, formInputStyles.textInput]}
                placeholderTextColor={colors.gray[400]}
                {...textInputProps}
              />
            </View>
          );
        }}
      </FormControl>
    );
  }
);

const inputStyles = {
  borderRadius: 8,
  paddingVertical: 4,
  paddingHorizontal: 12,
  borderWidth: 1,
  borderColor: colors.gray[400],
};
export const formInputStyles = StyleSheet.create({
  input: {
    ...inputStyles
  },
  inputError: {
    ...inputStyles,
    borderColor: colors.danger
  },
  textInput: {
    fontSize: textSizeStyles.md.fontSize,
    lineHeight: 0
  }
});

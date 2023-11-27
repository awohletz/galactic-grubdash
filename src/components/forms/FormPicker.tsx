import React from 'react';
import {FieldValidator} from "final-form";
import {FormControl} from './FormControl';
import {map} from "lodash";
import {Picker} from '@react-native-picker/picker';
import {colors} from "../../theme";
import {SelectOption} from "../../types";

export interface FormPickerProps {
  label: string;
  name: string;
  validate?: FieldValidator<any>;
  helpText?: string;

  options?: SelectOption[];
}

export const FormPicker: React.FC<FormPickerProps> = ({
                                                        name,
                                                        label,
                                                        helpText,
                                                        validate, options
                                                      }) => {
  return (
    <FormControl
      name={name}
      label={label}
      helpText={helpText}
      validate={validate}>
      {(input) => {
        return <Picker selectedValue={input.value} style={{borderColor: colors.gray[400], borderWidth: 1, borderRadius: 8}}
                       onValueChange={(itemValue) =>
                         input.onChange(itemValue)
                       }>
          {map(options, (o) =>
            <Picker.Item key={o.value} label={o.label} value={o.value}/>)}
        </Picker>
      }}
    </FormControl>
  );
}

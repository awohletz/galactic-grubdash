import React from 'react';
import {common} from "../theme";
import {Text} from "./Text";
import {HStack} from "./HStack";

export interface KeyValueRowProps {
  label: string;
  value: string;
}

export const LabelValueRow: React.FC<KeyValueRowProps> = ({label, value}) => {
    return (
      <HStack style={[common.justifySpaceBetween, common.borderBottom]}>
        <Text bold>{label}</Text>
        <Text>{value}</Text>
      </HStack>
    );
}

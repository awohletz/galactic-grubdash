import React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {common, stackStyles} from "../theme";

export interface VStackProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  space?: number;
}

export const HStack: React.FC<VStackProps> = ({ children, style, space }) => {
  const spaceStyle = space !== undefined ? stackStyles[`space${space}` as keyof typeof stackStyles] : null;

  return (
    <View style={[stackStyles.container, common.flexRow, style, spaceStyle]}>
      {children}
    </View>
  );
};

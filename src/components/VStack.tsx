import React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {stackStyles} from "../theme";

export interface VStackProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  space?: number;
}

export const VStack: React.FC<VStackProps> = ({ children, style, space }) => {
  const spaceStyle = space !== undefined ? stackStyles[`space${space}` as keyof typeof stackStyles] : null;

  return (
    <View style={[stackStyles.container, style, spaceStyle]}>
      {children}
    </View>
  );
};

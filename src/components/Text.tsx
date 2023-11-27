import React from 'react';
import {StyleSheet, Text as RNText} from "react-native";
import {colors, textSizeStyles} from "../theme";

export interface TextProps extends React.ComponentProps<typeof RNText> {
  children?: any;
  colorScheme?: "black" | "primary" | "light" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  bold?: boolean;
  center?: boolean;
  muted?: boolean;
}

export const Text: React.FC<TextProps> = ({
                                            children,
                                            colorScheme = "black",
                                            size = "md",
                                            bold,
                                            center,
                                            muted,
                                            style,
                                            ...textProps
                                          }) => {
  const colorStyle = colorStyles[colorScheme];
  const sizeStyle = textSizeStyles[size];
  const weightStyle = bold ? miscStyles.bold : undefined;
  const textAlignStyle = center ? miscStyles.center : undefined;
  const mutedStyle = muted ? miscStyles.muted : undefined;

  return (
    <RNText style={[colorStyle, sizeStyle, weightStyle, mutedStyle, textAlignStyle, style]} {...textProps}>
      {children}
    </RNText>
  );
}

const colorStyles = StyleSheet.create({
  black: {
    color: "#000"
  },
  primary: {
    color: colors.primary[600]
  },
  light: {
    color: colors.gray[50]
  },
  danger: {
    color: colors.danger
  }
});

const miscStyles = StyleSheet.create({
  muted: {
    opacity: 0.6
  },
  bold: {
    fontWeight: "bold"
  },
  center: {
    textAlign: "center"
  }
});

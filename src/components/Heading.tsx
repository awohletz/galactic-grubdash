import React from 'react';
import {Text, TextProps} from "./Text";
import {headingSizeStyles} from "../theme";

export interface HeadingProps extends TextProps {
  size: "sm" | "md" | "lg" | "xl";
}

export const Heading: React.FC<HeadingProps> = ({size, style, ...props}) => {
  const sizeStyle = headingSizeStyles[size];

  return (
    <Text {...props} accessibilityRole={"header"} style={[style, sizeStyle]}/>
  );
}

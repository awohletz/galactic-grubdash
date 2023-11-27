import React from 'react';
import {ActivityIndicator, Pressable, StyleProp, Text, View} from "react-native";
import {colors, common, primaryColor, textSizeStyles} from "../theme";

export type ButtonColorScheme =
  "primary"
  | "secondary";

export interface ButtonProps {
  onPress: () => void;
  children: any;
  style?: StyleProp<any>;
  variant?: "solid";
  colorScheme?: ButtonColorScheme;
  isLoading?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isDisabled?: boolean;
  leftIcon?: (size: number, color: string) => React.JSX.Element;
}

export const Button: React.FC<ButtonProps> = ({
                                                onPress, children, style,
                                                variant = "solid",
                                                colorScheme = "secondary",
                                                isLoading,
                                                size = "md",
                                                isDisabled,
                                                leftIcon
                                              }) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = textSizeStyles[size];

  return (
    <Pressable disabled={isDisabled || isLoading}
               accessibilityRole={"button"}
               accessibilityState={{disabled: isDisabled, busy: isLoading}}
               onPress={onPress}>
      {({pressed}) => {
        const state = isDisabled
          ? "disabled"
          : pressed
            ? "pressed"
            : "default";
        const colorStyle = colorStyles[variant][colorScheme][state];

        return <View style={[variantStyle, colorStyle.wrapper, pressableStyles, style]}>
          {leftIcon && !isLoading ?
            <View style={common.pr2}>
              {leftIcon(20, colorStyle.text.color)}
            </View>
            : null}
          {isLoading
            ? <ActivityIndicator color={"white"}/>
            : typeof children === "string"
              ? <Text style={[sizeStyle, colorStyle.text]}>{children}</Text>
              : children}
        </View>;
      }}
    </Pressable>
  );
}

const pressableStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "nowrap",
}

const colorStyles = {
  solid: {
    primary: {
      default: {
        wrapper: {
          backgroundColor: primaryColor,
        },
        text: {
          fontWeight: "bold",
          color: "#FFF",
        },
      },
      disabled: {
        wrapper: {
          backgroundColor: colors.gray[100],
        },
        text: {
          fontWeight: "bold",
          color: "black",
        },
      },
      pressed: {
        wrapper: {
          backgroundColor: colors.primary[600],
        },
        text: {
          fontWeight: "bold",
          color: "#FFF",
        },
      },
    },
    secondary: {
      default: {
        wrapper: {
          backgroundColor: colors.gray[700],
        },
        text: {
          fontWeight: "bold",
          color: "#FFF",
        },
      },
      disabled: {
        wrapper: {
          backgroundColor: colors.gray[100],
        },
        text: {
          fontWeight: "bold",
          color: "black",
        },
      },
      pressed: {
        wrapper: {
          backgroundColor: colors.gray[900],
        },
        text: {
          fontWeight: "bold",
          color: "#FFF",
        },
      },
    },
  },
} as const;


const variantStyles = {
  solid: {
    borderWidth: 0,
    borderRadius: 4,
    ...common.px4,
    ...common.py2,
    minHeight: 44,
  },
};

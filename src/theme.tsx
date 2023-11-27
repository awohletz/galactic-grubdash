import {StyleSheet} from "react-native";

export const primaryColor = "#0EA5E9";
export const colors = {
  primary: {
    50: "#F0F9FF",
    100: "#E0F2FE",
    200: "#BAE6FD",
    300: "#7DD3FC",
    400: "#38BDF8",
    500: primaryColor,
    600: "#0284C7",
    700: "#0369A1",
    800: "#075985",
    900: "#0C4A6E"
  },
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827"
  },
  bgDark: "#004e73",
  danger: "#c51a0d"
};

export const common = StyleSheet.create({
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[300]
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300]
  },
  screen: {
    height: "100%",
    backgroundColor: colors.gray[100],
    display: "flex",
    flexDirection: "column"
  },
  bgWhite: {
    backgroundColor: "#fff"
  },
  bgDark: {
    backgroundColor: colors.bgDark
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center"
  },
  flexWrap: {
    flexWrap: "wrap"
  },
  alignItemsStart: {
    alignItems: "flex-start"
  },
  alignItemsEnd: {
    alignItems: "flex-end"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  alignItemsStretch: {
    alignItems: "stretch"
  },
  justifySpaceBetween: {
    justifyContent: "space-between"
  },
  justifySpaceAround: {
    justifyContent: "space-around"
  },
  flex1: {
    flex: 1
  },
  flexGrow: {
    flexGrow: 1
  },
  textCenter: {
    textAlign: "center"
  },
  textLeft: {
    textAlign: "left"
  },
  textRight: {
    textAlign: "right"
  },
  textItalic: {
    fontStyle: "italic"
  },
  textCapitalized: {
    textTransform: "uppercase"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  absolute: {
    position: "absolute"
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  p0: {
    padding: 0
  },
  p1: {
    padding: 4
  },
  p2: {
    padding: 8
  },
  p3: {
    padding: 12
  },
  p4: {
    padding: 16
  },
  p5: {
    padding: 20
  },
  p6: {
    padding: 24
  },
  m0: {
    margin: 0
  },
  m1: {
    margin: 4
  },
  m2: {
    margin: 8
  },
  m3: {
    margin: 12
  },
  m4: {
    margin: 16
  },
  m5: {
    margin: 20
  },
  m6: {
    margin: 24
  },
  m7: {
    margin: 28
  },
  mb4: {
    marginBottom: 16
  },
  mb3: {
    marginBottom: 12
  },
  mb2: {
    marginBottom: 8
  },
  mb1: {
    marginBottom: 4
  },
  mb5: {
    marginBottom: 20
  },
  mb6: {
    marginBottom: 24
  },
  mt4: {
    marginTop: 16
  },
  mt3: {
    marginTop: 12
  },
  mt2: {
    marginTop: 8
  },
  mt1: {
    marginTop: 4
  },
  mt5: {
    marginTop: 20
  },
  mt6: {
    marginTop: 24
  },
  mt7: {
    marginTop: 28
  },
  mx1: {
    marginHorizontal: 4
  },
  mx2: {
    marginHorizontal: 8
  },
  mx3: {
    marginHorizontal: 12
  },
  mx4: {
    marginHorizontal: 16
  },
  mx5: {
    marginHorizontal: 20
  },
  mx6: {
    marginHorizontal: 24
  },
  mx7: {
    marginHorizontal: 28
  },
  mx8: {
    marginHorizontal: 32
  },
  px0: {
    paddingHorizontal: 0
  },
  px1: {
    paddingHorizontal: 4
  },
  px2: {
    paddingHorizontal: 8
  },
  px3: {
    paddingHorizontal: 12
  },
  px4: {
    paddingHorizontal: 16
  },
  px5: {
    paddingHorizontal: 20
  },
  px6: {
    paddingHorizontal: 24
  },
  py1: {
    paddingVertical: 4
  },
  py2: {
    paddingVertical: 8
  },
  py3: {
    paddingVertical: 12
  },
  py4: {
    paddingVertical: 16
  },
  py5: {
    paddingVertical: 20
  },
  py6: {
    paddingVertical: 24
  },
  pt0: {
    paddingTop: 0
  },
  pt1: {
    paddingTop: 4
  },
  pt2: {
    paddingTop: 8
  },
  pt3: {
    paddingTop: 12
  },
  pt4: {
    paddingTop: 16
  },
  pt5: {
    paddingTop: 20
  },
  pt6: {
    paddingTop: 24
  },
  pr1: {
    paddingRight: 4
  },
  pr2: {
    paddingRight: 8
  },
  pr3: {
    paddingRight: 12
  },
  pr4: {
    paddingRight: 16
  },
  pr5: {
    paddingRight: 20
  },
  pr6: {
    paddingRight: 24
  },
  pl1: {
    paddingLeft: 4
  },
  pl2: {
    paddingLeft: 8
  },
  pl3: {
    paddingLeft: 12
  },
  pl4: {
    paddingLeft: 16
  },
  pl5: {
    paddingLeft: 20
  },
  pl6: {
    paddingLeft: 24
  },
  pb1: {
    paddingBottom: 4
  },
  pb2: {
    paddingBottom: 8
  },
  pb3: {
    paddingBottom: 12
  },
  pb4: {
    paddingBottom: 16
  },
  pb5: {
    paddingBottom: 20
  },
  pb6: {
    paddingBottom: 24
  },
  my0: {
    marginVertical: 0
  },
  my1: {
    marginVertical: 4
  },
  my2: {
    marginVertical: 8
  },
  my3: {
    marginVertical: 12
  },
  my4: {
    marginVertical: 16
  },
  my5: {
    marginVertical: 20
  },
  my6: {
    marginVertical: 24
  },
  ml1: {
    marginLeft: 4
  },
  ml2: {
    marginLeft: 8
  },
  ml3: {
    marginLeft: 12
  },
  ml4: {
    marginLeft: 16
  },
  ml5: {
    marginLeft: 20
  },
  ml6: {
    marginLeft: 24
  },
  mr1: {
    marginRight: 4
  },
  mr2: {
    marginRight: 8
  },
  mr3: {
    marginRight: 12
  },
  mr4: {
    marginRight: 16
  },
  mr5: {
    marginRight: 20
  },
  mr6: {
    marginRight: 24
  },
  fullWidth: {
    width: "100%"
  },
  fullHeight: {
    height: "100%"
  },
  gap0: {
    gap: 0
  },
  gap1: {
    gap: 4
  },
  gap2: {
    gap: 8
  },
  gap3: {
    gap: 12
  },
  gap4: {
    gap: 16
  },
  gap5: {
    gap: 20
  },
  gap6: {
    gap: 24
  },
  fontWeightBold: {
    fontWeight: "bold"
  },
});

export const stackStyles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 12,
  },
  space0: {
    gap: 0,
  },
  space1: {
    gap: 4,
  },
  space2: {
    gap: 8,
  },
  space3: {
    gap: 12,
  },
  space4: {
    gap: 16,
  },
  space5: {
    gap: 20,
  },
  space6: {
    gap: 24,
  },
  space7: {
    gap: 28,
  }
});


const defaultFontSize = 16;

function textStyle(fontSizeMultiplier: number, lineHeightMultiplier: number) {
  const fontSize = defaultFontSize * fontSizeMultiplier;
  return {
    fontSize: fontSize,
    lineHeight: fontSize * lineHeightMultiplier
  };
}

export const textSizeStyles = StyleSheet.create({
  xs: textStyle(0.64, 1.65),
  sm: textStyle(0.8, 1.65),
  md: textStyle(1, 1.65),
  lg: textStyle(1.25, 1.65),
  xl: textStyle(1.56, 1.65)
});

export const headingSizeStyles = StyleSheet.create({
  sm: textStyle(1.56, 1.15),
  md: textStyle(1.95, 1.15),
  lg: textStyle(2.44, 1.15),
  xl: textStyle(3.05, 1.15)
});



import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

export const COLORS = {
  primary: "#002DE3",
  secondary: "#0F1828",
  white: "#FFFFFF",
  secondaryWhite: "#F7F7FC",
  green: "#2CC069",
  black: "#0000000",
  gray: "#CCCCCC",
};

export const SIZES = {
  // global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,

  //font SIZES
  largeTitle: 0,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 22,
  body3: 20,
  body4: 18,
  //app dimentions

};

export const FONTS = {
  largeTitle: {
    fontFamily: "black",
    fontSize: SIZES.largeTitle,
    lineHight: 55,
  },
  h1: { fontFamily: "bold", fontSize: SIZES.h1, lineHight: 36 },
  h2: { fontFamily: "bold", fontSize: SIZES.h2, lineHight: 30 },
  h3: { fontFamily: "bold", fontSize: SIZES.h3, lineHight: 22 },
  h4: { fontFamily: "bold", fontSize: SIZES.h4, lineHight: 20 },
  body1: { fontFamily: "regular", fontSize: SIZES.body1, lineHight: 36 },
  body2: { fontFamily: "regular", fontSize: SIZES.body2, lineHight: 30 },
  body3: { fontFamily: "regular", fontSize: SIZES.body3, lineHight: 22 },
  body4: { fontFamily: "regular", fontSize: SIZES.body4, lineHight: 20 },
};

const appTheme = { COLORS, FONTS, SIZES };
export default appTheme;

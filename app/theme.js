"use client";

import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
};

// const theme = extendTheme({ config });
const theme = extendTheme({
  config,
  // Configura el tema claro y oscuro aquí
  colorsCustom: {
    // ...config.colors,
    colorBackgroundOnSelected: {
      light: "#ffedc7",
      dark: "#736c66ba",
    },
    colorBackgroundOnHover: {
      light: "#fff9ed",
      dark: "#5b5957ba",
    }
  }
});

// console.log("theme ----> ", theme);

export default theme;

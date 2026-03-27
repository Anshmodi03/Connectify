import { createTheme } from "@mui/material/styles";

const darkTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0D0D0D",
    1000: "#000000",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: "#4A54C0",
              main: "#5E6AD2",
              light: "#7B85DB",
            },
            secondary: {
              dark: "#BE1038",
              main: "#E11D48",
              light: "#F43F65",
            },
            neutral: {
              dark: "#EDEDEF",
              main: "#C5C7CC",
              mediumMain: "#A0A3AC",
              medium: "#8A8F98",
              light: "#1E1E2A",
            },
            background: {
              default: "#0A0A0F",
              paper: "#111118",
              alt: "#1A1A25",
            },
            text: {
              primary: "#EDEDEF",
              secondary: "#8A8F98",
            },
            divider: "rgba(255,255,255,0.08)",
          }
        : {
            primary: {
              dark: "#3B4BB5",
              main: "#5E6AD2",
              light: "#8B95E3",
            },
            secondary: {
              dark: "#BE1038",
              main: "#E11D48",
              light: "#F87096",
            },
            neutral: {
              dark: "#1A1A2E",
              main: "#3A3A5C",
              mediumMain: "#6B6B8A",
              medium: "#8A8FA8",
              light: "#F2F2F8",
            },
            background: {
              default: "#F4F4F8",
              paper: "#FFFFFF",
              alt: "#EEEEF6",
            },
            text: {
              primary: "#1A1A2E",
              secondary: "#6B6B8A",
            },
            divider: "rgba(0,0,0,0.08)",
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      h1: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 40, fontWeight: 700 },
      h2: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 32, fontWeight: 600 },
      h3: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 24, fontWeight: 600 },
      h4: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 20, fontWeight: 600 },
      h5: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 16, fontWeight: 500 },
      h6: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 14, fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 500,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: "10px !important",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode) => createTheme(themeSettings(mode));

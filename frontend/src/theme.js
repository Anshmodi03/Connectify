import { createTheme } from "@mui/material/styles";

// Dark-only design tokens
const darkTokens = {
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
    default: "#09090E",
    paper: "#0F0F18",
    alt: "#141420",
  },
  text: {
    primary: "#EDEDEF",
    secondary: "#8A8F98",
  },
  divider: "rgba(255,255,255,0.07)",
};

// Always returns dark theme — light mode removed
export const themeSettings = (_mode) => ({
  palette: {
    mode: "dark",
    ...darkTokens,
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 14,
    h1: { fontFamily: "Inter, sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1.2 },
    h2: { fontFamily: "Inter, sans-serif", fontSize: 32, fontWeight: 600, lineHeight: 1.3 },
    h3: { fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 600, lineHeight: 1.35 },
    h4: { fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 600, lineHeight: 1.4 },
    h5: { fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, lineHeight: 1.5 },
    h6: { fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, lineHeight: 1.5 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "14px",
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
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255,255,255,0.07)",
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(themeSettings(mode));

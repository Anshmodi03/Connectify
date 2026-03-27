import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import store from "./state/index.js";
import { createAppTheme } from "./theme.js";
import App from "./App.jsx";
import "./index.css";

const ThemeWrapper = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1A1A25",
            color: "#EDEDEF",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#5E6AD2", secondary: "#EDEDEF" } },
          error: { iconTheme: { primary: "#E11D48", secondary: "#EDEDEF" } },
        }}
      />
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  </StrictMode>
);

import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // Amazon-inspired deep header blue
      main: "#131921",
    },
    secondary: {
      // Accent / hover color (subnav)
      main: "#232F3E",
    },
    background: {
      // Light gray page background like Amazon home
      default: "#E3E6E6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F1111",
      secondary: "#565959",
    },
    
  },

  typography: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: {
      textTransform: "none",   // clean buttons (no uppercase)
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 18px",
          boxShadow: "none",
        },
        contained: {
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

export default customTheme;

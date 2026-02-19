import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB",   // Soft blue
    },
    secondary: {
      main: "#64748B",   // Neutral gray
    },
    background: {
      default: "#F8FAFC",   // Page background (very light gray)
      paper: "#FFFFFF",     // Cards & surfaces
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
    
  },

  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
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

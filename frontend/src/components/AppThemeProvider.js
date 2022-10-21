import React from "react";
import { CssBaseline } from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const AppThemeProvider = ({ children }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#e53935",
      },
      background: {
        default: "#fafafa",
        paper: "#9e9e9e",
      },
      success: {
        main: "#4caf50",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;

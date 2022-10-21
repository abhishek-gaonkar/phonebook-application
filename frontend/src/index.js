import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppThemeProvider from "./components/AppThemeProvider";
import { AuthContextProvider } from "./context/AuthContext";
import Pages from "./pages";

ReactDOM.render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthContextProvider>
        <Pages />
      </AuthContextProvider>
    </AppThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

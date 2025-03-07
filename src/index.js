import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#008080", // Teal
    colorText: "#2C3E50", // Dark Blue-Gray
    colorBgBase: "#FFFFFF", // White
    colorBorder: "#20B2AA", // Light Teal
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider theme={theme}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

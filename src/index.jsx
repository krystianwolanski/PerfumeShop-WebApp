import React from "react"
import { createTheme, ThemeProvider } from "@material-ui/core/styles"

import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const theme = createTheme({
  palette: {
    primary: {
      main: "#805A40",
    },
    secondary: {
      main: "#DABEA3",
    },

    error: {
      main: "#C05F5F",
    },
    warning: {
      main: "#FFDA85",
    },
    info: {
      main: "#4C6275",
    },
    success: {
      main: "#257970",
    },
    // success: {
    //   main: "#C9CBA3",
    // },
    // info: {
    //   main: "#4B88A2",
    // },
    // contrastThreshold: 3,
  },
  typography: {
    fontFamily: ["'Montserrat', sans-serif"].join(","),
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { ThemeProvider } from "styled-components"
import { Router } from "./Router"
import { BrowserRouter } from "react-router-dom";
import { CyclesContextProvider } from "./contexts/CyclesContexts";


export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}


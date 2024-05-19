import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Layout from "./screens/layout";
import Dashboard from "./screens/dashboard";
import Location from "screens/location";
import Overview from "./screens/overview";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode])
  return (
    <div className="app">
      <Router>
      <ThemeProvider theme={theme}>

        <CssBaseline/>
        <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<Navigate to ='/dashboard' replace/>}/>
        <Route path ='/dashboard' element={<Dashboard/>}/>
        <Route path ='/location' element={<Location/>}/>
        <Route exact path ='/overview' element={<Overview/>}/>


        </Route>
        </Routes>
      </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;

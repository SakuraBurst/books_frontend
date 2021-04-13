import React from "react";
import "./App.css";
import Router from "./router/Router";
import GreatLoader from "./components/GreatLoader";
import { useAppSelector } from "./helpers/hooks";
import Alert from "./components/Alert";

function App() {
  const loading = useAppSelector((a) => a.common.appLoading);
  return (
    <div className="App">
      <div style={!loading ? { display: "none" } : {}}>
        <GreatLoader />
      </div>
      <div className="app_container" style={loading ? { display: "none" } : {}}>
        <Router />
        <Alert />
      </div>
    </div>
  );
}

export default App;

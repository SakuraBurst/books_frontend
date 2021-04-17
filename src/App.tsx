import React from "react";
import "./App.css";
import Router from "./router/Router";
import GreatLoader from "./components/GreatLoader";
import { useAppDispatch, useAppSelector } from "./helpers/hooks";
import Alert from "./components/Alert";
import { useAuth } from "./context/AuthProvider";
import { Button } from "react-bootstrap";
import { logoutAction } from "./store/actions/auth";

function App() {
  const loading = useAppSelector((a) => a.common.appLoading);
  const dispatch = useAppDispatch();
  function logout() {
    dispatch(logoutAction());
  }
  const auth = useAuth();
  return (
    <div className="App">
      <div style={!loading ? { display: "none" } : {}}>
        <GreatLoader />
      </div>
      <div className="app_container" style={loading ? { display: "none" } : {}}>
        <Router />
        <Alert />
      </div>
      {auth && auth.user && (
        <Button
          variant="danger"
          size="lg"
          className="logout-button"
          onClick={logout}
        >
          логаут
        </Button>
      )}
    </div>
  );
}

export default App;

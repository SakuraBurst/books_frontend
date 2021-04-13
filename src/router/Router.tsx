import { Route, Switch, withRouter } from "react-router-dom";
import { Lol } from "../components/Lol";
import { RouteI } from "./router.types";
import { Authorization } from "../components/pages/Authoriztion";
import { ListOfBooks } from "../components/pages/Books";
import ProtectedRoute from "./ProtectedRoute";
import { Registration } from "../components/pages/Registration";

export default function Router() {
  const route: Array<RouteI> = [
    {
      routeName: "/registration",
      routeComponent: withRouter(Registration),
      private: false,
    },
    {
      routeName: "/about",
      routeComponent: withRouter(Lol),
      private: true,
    },
    {
      routeName: "/books",
      routeComponent: withRouter(ListOfBooks),
      private: true,
    },
    {
      routeName: "/",
      routeComponent: withRouter(Authorization),
      private: false,
    },
  ];
  return (
    <Switch>
      {route.map((a: RouteI) =>
        a.private ? (
          <ProtectedRoute key={a.routeName} path={a.routeName}>
            {a.routeComponent}
          </ProtectedRoute>
        ) : (
          <Route key={a.routeName} path={a.routeName}>
            {a.routeComponent}
          </Route>
        )
      )}
    </Switch>
  );
}

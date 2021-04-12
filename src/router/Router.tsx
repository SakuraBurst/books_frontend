import { Route, Switch } from "react-router-dom";
import Lol from "../components/Lol";
import { RouteI } from "./router.types";
import Authorization from "../components/pages/Authoriztion";

export default function Router() {
  const route: Array<RouteI> = [
    {
      routeName: "/authorization",
      routeComponent: <Authorization />,
    },
    {
      routeName: "/about",
      routeComponent: <Lol />,
    },
  ];
  return (
    <Switch>
      {route.map((a: RouteI) => (
        <Route key={a.routeName} path={a.routeName}>
          {a.routeComponent}
        </Route>
      ))}
    </Switch>
  );
}

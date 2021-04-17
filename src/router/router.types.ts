import { FC, ReactNode } from "react";
import {
  RouteComponentProps,
  StaticContext,
  WithRouterStatics,
} from "react-router";

export type RouteI = {
  routeName: string;
  routeComponent:
    | WithRouterStatics<FC<RouteComponentProps<any, StaticContext, unknown>>>
    | ReactNode;
  private: boolean;
};

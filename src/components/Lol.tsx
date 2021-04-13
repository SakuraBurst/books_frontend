import { Button } from "react-bootstrap";
import { useAppSelector } from "../helpers/hooks";
import { FC } from "react";
import { RouteComponentProps, StaticContext } from "react-router";

export const Lol: FC<RouteComponentProps<any, StaticContext, unknown>> = () => {
  const token = useAppSelector((a) => a.auth.token);
  return (
    <div>
      <Button variant="success">{token}</Button>
    </div>
  );
};

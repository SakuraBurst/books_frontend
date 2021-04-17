import { useAuth } from "../context/AuthProvider";
import { Redirect, Route } from "react-router-dom";
import { ReactNode } from "react";

export default function ProtectedRoute({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) {
  const auth = useAuth();
  return auth && auth.currentToken ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to={"/"} />
  );
}

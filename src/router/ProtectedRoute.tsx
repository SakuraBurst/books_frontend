import { useAuth } from "../context/AuthProvider";
import { Redirect, Route } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../helpers/hooks";
import { setAlert } from "../store/actions/common";

export default function ProtectedRoute({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  useEffect(() => {
    if (!auth || (auth && !auth.user)) {
      console.log(auth);
      dispatch(setAlert({ type: "error", text: "Вы должны быть залогинены" }));
    }
  });
  return auth && auth.user ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to={"/"} />
  );
}

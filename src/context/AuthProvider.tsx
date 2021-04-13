import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { History } from "history";
import { User } from "../entity/user.types";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import {
  loginAction,
  logoutAction,
  registrationAction,
} from "../store/actions/auth";
import { RegistrationForm } from "../entity/form.types";
type auth =
  | {
      user: User | undefined;
      login(email: string, password: string, history: History<unknown>): void;
      logOut(): void;
      registration(newUser: RegistrationForm): void;
    }
  | undefined;

const AuthContext = createContext<auth>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // ну да шобы линтер не ругался
  const dispatch = useRef(useAppDispatch());
  dispatch.current = useAppDispatch();
  const user = useAppSelector((a) => a.auth.user);
  const auth = {
    user,
    login(email: string, password: string, history: History<unknown>) {
      console.log("d2");
      dispatch.current(loginAction(email, password, history));
    },
    logOut() {
      dispatch.current(logoutAction());
    },
    registration(newUser: RegistrationForm) {
      dispatch.current(registrationAction(newUser));
    },
  };
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     dispatch.current(getUserByToken(localStorage.getItem("token")!));
  //   } else {
  //   }
  // }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
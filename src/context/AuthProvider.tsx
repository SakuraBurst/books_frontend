import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { History } from "history";
import { User } from "../entity/user.types";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import {
  getUserByToken,
  loginAction,
  logoutAction,
  registrationAction,
} from "../store/actions/auth";
import { AuthorizationForm, RegistrationForm } from "../entity/form.types";
import { LOCAL_STORAGE_KEY } from "../store/sideEffects/auth";
import { AxiosInstanse } from "../helpers/axios";
import GreatLoader from "../components/GreatLoader";
import { firstAppLoading } from "../store/actions/common";
type auth =
  | {
      currentToken: string;
      user: User | undefined;
      login(login: AuthorizationForm, history: History<unknown>): void;
      logOut(): void;
      registration(newUser: RegistrationForm, history: History<unknown>): void;
    }
  | undefined;

const AuthContext = createContext<auth>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  // ну да шобы линтер не ругался
  const dispatch = useRef(useAppDispatch());
  dispatch.current = useAppDispatch();
  const { user, token } = useAppSelector((a) => a.auth);
  const isAppLoading = useAppSelector((a) => a.common.firstAppLoading);
  const auth = {
    currentToken: token,
    user,
    login(login: AuthorizationForm, history: History<unknown>) {
      dispatch.current(loginAction(login, history));
    },
    logOut() {
      dispatch.current(logoutAction());
    },
    registration(newUser: RegistrationForm, history: History<unknown>) {
      dispatch.current(registrationAction(newUser, history));
    },
  };
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token) {
      AxiosInstanse.defaults.headers["Authorization"] = token;
      dispatch.current(getUserByToken());
    } else {
      dispatch.current(firstAppLoading(false));
    }
  }, []);
  return auth && !isAppLoading ? (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  ) : (
    <GreatLoader />
  );
};

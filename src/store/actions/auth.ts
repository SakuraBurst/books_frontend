import { MutationTypes } from "../../entity/mutation.types";
import { UserResponseType } from "../../entity/user.types";
import { History } from "history";
import { RegistrationForm } from "../../entity/form.types";
export const loginAction = (
  email: string,
  password: string,
  history: History<unknown>
) => {
  return <const>{
    type: MutationTypes.LOGIN,
    email,
    password,
    history,
  };
};
export const registrationAction = (newUser: RegistrationForm) => {
  return <const>{
    type: MutationTypes.REGISTRATION,
    newUser,
  };
};

export const getUserByToken = (token: string) => {
  return <const>{
    type: MutationTypes.REGISTRATION,
    token,
  };
};
export const loginActionSuccess = (data: UserResponseType) =>
  <const>{
    type: MutationTypes.LOGIN_SUCCESS,
    data,
  };
export const setToken = (data: string) =>
  <const>{
    type: MutationTypes.SET_TOKEN,
    token: data,
  };
export const logoutAction = () =>
  <const>{
    type: MutationTypes.LOGOUT,
    token: "",
    user: undefined,
  };

import { MutationTypes } from "../../entity/mutation.types";
import { UserResponseType } from "../../entity/user.types";
import { History } from "history";
import { AuthorizationForm, RegistrationForm } from "../../entity/form.types";
export const loginAction = (
  loginObj: AuthorizationForm,
  history: History<unknown>
) => {
  return <const>{
    type: MutationTypes.LOGIN,
    loginObj,
    history,
  };
};
export const registrationAction = (
  newUser: RegistrationForm,
  history: History<unknown>
) => {
  return <const>{
    type: MutationTypes.REGISTRATION,
    newUser,
    history,
  };
};

export const getUserByToken = () => {
  return <const>{
    type: MutationTypes.GET_USER_BY_TOKEN,
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
  };

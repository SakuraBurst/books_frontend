import { MutationTypes } from "../../entity/mutation.types";
import { UserResponseType } from "../../entity/user.types";

export const loginAction = (email: string) => {
  console.log(email);
  return <const>{
    type: MutationTypes.LOGIN,
    email,
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

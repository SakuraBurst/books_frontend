import { MutationTypes } from "./mutation.types";
import { UserResponseType } from "./user.types";

export type Login = {
  type: MutationTypes.LOGIN;
  data: UserResponseType;
};

export type SetToken = {
  type: MutationTypes.SET_TOKEN;
  data: UserResponseType;
};

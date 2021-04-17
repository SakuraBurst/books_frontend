import { User } from "../../entity/user.types";
import { MutationTypes } from "../../entity/mutation.types";
import { CoolType } from "../actions";

export interface AuthReducer {
  token: string;
  user: User | undefined;
}

export let initialProfileStore: AuthReducer = {
  token: "",
  user: undefined,
};

export default function userReducer(
  state = initialProfileStore,
  action: CoolType
): AuthReducer {
  switch (action.type) {
    case MutationTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
      };
    case MutationTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case MutationTypes.LOGOUT:
      return {
        ...state,
        token: "",
        user: undefined,
      };
    default:
      return state;
  }
}

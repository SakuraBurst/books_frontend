import { User } from "../../entity/user.types";
import { MutationTypes } from "../../entity/mutation.types";
import { CoolType } from "../actions";

export interface AuthReducer {
  token: string;
  user: User | undefined;
}

export let initialProfileStore: AuthReducer = {
  token: "1111111111",
  user: undefined,
};

export default function userReducer(
  state = initialProfileStore,
  action: CoolType
): AuthReducer {
  switch (action.type) {
    case MutationTypes.LOGIN_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        user: action.data.user,
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

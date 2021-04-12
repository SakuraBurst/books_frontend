import { UserResponseType } from "../../entity/user.types";
import { MutationTypes } from "../../entity/mutation.types";
import { CoolType } from "../actions";

export let initialProfileStore: UserResponseType = {
  token: "1111111111",
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
  },
};

export default function userReducer(
  state = initialProfileStore,
  action: CoolType
): UserResponseType {
  switch (action.type) {
    case MutationTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data.user,
      };
    default:
      return state;
  }
}

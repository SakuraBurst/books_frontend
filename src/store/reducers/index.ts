import { combineReducers, Reducer } from "redux";
import userReducer, { initialProfileStore } from "./profile";
import { UserResponseType } from "../../entity/user.types";

export interface AppStore {
  auth: UserResponseType;
}

export const initialState: AppStore = {
  auth: initialProfileStore,
};

export default function createReducers(): Reducer<AppStore> {
  return combineReducers<AppStore>({
    auth: userReducer,
  });
}

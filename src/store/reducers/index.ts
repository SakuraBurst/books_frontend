import { combineReducers, Reducer } from "redux";
import userReducer, { initialProfileStore } from "./profile";
import { UserResponseType } from "../../entity/user.types";
import booksReducer, { BookReducer, initialBooksStore } from "./books";

export interface AppStore {
  auth: UserResponseType;
  books: BookReducer;
}

export const initialState: AppStore = {
  auth: initialProfileStore,
  books: initialBooksStore,
};

export default function createReducers(): Reducer<AppStore> {
  return combineReducers<AppStore>({
    auth: userReducer,
    books: booksReducer,
  });
}

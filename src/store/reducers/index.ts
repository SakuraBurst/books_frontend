import { combineReducers, Reducer } from "redux";
import userReducer, { AuthReducer, initialProfileStore } from "./profile";
import booksReducer, { BookReducer, initialBooksStore } from "./books";
import commonReducer, { CommonReducer, initialCommonStore } from "./common";

export interface AppStore {
  common: CommonReducer;
  auth: AuthReducer;
  books: BookReducer;
}

export const initialState: AppStore = {
  common: initialCommonStore,
  auth: initialProfileStore,
  books: initialBooksStore,
};

export default function createReducers(): Reducer<AppStore> {
  return combineReducers<AppStore>({
    common: commonReducer,
    auth: userReducer,
    books: booksReducer,
  });
}

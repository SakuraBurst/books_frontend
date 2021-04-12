import { book, BooksResponseType } from "../../entity/books.types";
import { MutationTypes } from "../../entity/mutation.types";
import { CoolType } from "../actions";

export interface BookReducer {
  books: BooksResponseType;
  currentBook: book | null;
}

export let initialProfileStore: BookReducer = {
  books: [],
  currentBook: null,
};

export default function userReducer(
  state = initialProfileStore,
  action: CoolType
): BookReducer {
  switch (action.type) {
    case MutationTypes.SET_BOOKS:
      return {
        ...state,
        books: action.data,
      };
    default:
      return state;
  }
}

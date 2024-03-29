import { Book, BooksResponseType } from "../../entity/books.types";
import { MutationTypes } from "../../entity/mutation.types";
import { CoolType } from "../actions";

export interface BookReducer {
  books: BooksResponseType;
  currentBook: Book | null;
}

export let initialBooksStore: BookReducer = {
  books: [],
  currentBook: null,
};

export default function booksReducer(
  state = initialBooksStore,
  action: CoolType
): BookReducer {
  switch (action.type) {
    case MutationTypes.SET_BOOKS:
      return {
        ...state,
        books: action.data,
      };
    case MutationTypes.SET_BOOK:
      return {
        ...state,
        currentBook: action.data,
      };
    default:
      return state;
  }
}

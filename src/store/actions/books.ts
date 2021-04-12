import { MutationTypes } from "../../entity/mutation.types";
import { BooksResponseType } from "../../entity/books.types";

export const fetchBooks = () =>
  <const>{
    type: MutationTypes.GET_BOOKS,
  };

export const setBooks = (data: BooksResponseType) =>
  <const>{
    type: MutationTypes.SET_BOOKS,
    data,
  };

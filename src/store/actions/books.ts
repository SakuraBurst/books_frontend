import { MutationTypes } from "../../entity/mutation.types";
import { Book, BooksResponseType } from "../../entity/books.types";
import { NewBookForm } from "../../entity/form.types";
import { History } from "history";

export const fetchBooks = () =>
  <const>{
    type: MutationTypes.GET_BOOKS,
  };

export const AddBook = (book: NewBookForm) =>
  <const>{
    type: MutationTypes.ADD_BOOK,
    book,
  };

export const EditBook = (bookForm: NewBookForm, id: string) =>
  <const>{
    type: MutationTypes.EDIT_BOOK,
    bookForm,
    id,
  };

export const setBooksIntoState = (data: BooksResponseType) =>
  <const>{
    type: MutationTypes.SET_BOOKS,
    data,
  };

export const fetchBook = (id: string) =>
  <const>{
    type: MutationTypes.GET_BOOK,
    id,
  };

export const setBookIntoState = (data: Book) =>
  <const>{
    type: MutationTypes.SET_BOOK,
    data,
  };

export const deleteBookAction = (id: string, history: History<unknown>) =>
  <const>{
    type: MutationTypes.DELETE_BOOK,
    id,
    history,
  };

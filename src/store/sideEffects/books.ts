import { AxiosInstanse } from "../../helpers/axios";
import { call, takeEvery, put } from "redux-saga/effects";
import { Book, BooksResponseType } from "../../entity/books.types";
import { MutationTypes } from "../../entity/mutation.types";
import {
  AddBook,
  deleteBookAction,
  EditBook,
  fetchBook,
  fetchBooks,
  setBookIntoState,
  setBooksIntoState,
} from "../actions/books";
import { AxiosResponse } from "axios";
import { setAlert, setAppLoading } from "../actions/common";
import { NewBookForm } from "../../entity/form.types";
import { ErrorSaga } from "./errors";

const getBooksApi = () => AxiosInstanse.get("/api/v2/books");

const getBookApi = (id: string) => () =>
  AxiosInstanse.get(`/api/v2/books/${id}`);

const setBookApi = (book: NewBookForm) => () =>
  AxiosInstanse.post("/api/v2/books", book);

const editBookApi = (book: NewBookForm, id: string) => () =>
  AxiosInstanse.put(`/api/v2/books/${id}`, book);

const deleteBookApi = (id: string) => () =>
  AxiosInstanse.delete(`/api/v2/books/${id}`);

function* GetBooksSaga() {
  yield put(setAppLoading(true));
  try {
    const books: AxiosResponse<BooksResponseType> = yield call(getBooksApi);
    yield put(setBooksIntoState(books.data));
    yield put(setAppLoading(false));
  } catch (e) {
    console.log(e);
    yield ErrorSaga(e, "штото пошло не так");
  }
}

function* AddBookSaga({ book }: ReturnType<typeof AddBook>) {
  yield put(setAppLoading(true));
  try {
    const books: AxiosResponse<BooksResponseType> = yield call(
      setBookApi(book)
    );
    yield put(setBooksIntoState(books.data));
    yield put(setAppLoading(false));
    yield put(
      setAlert({
        type: "success",
        text: "все круто ищи свою книгу в конце хыыыы",
      })
    );
  } catch (e) {
    yield ErrorSaga(e, "штото пошло не так, проверьте правильность данных");
  }
}

function* GetBookSaga({ id }: ReturnType<typeof fetchBook>) {
  yield put(setAppLoading(true));
  try {
    const book: AxiosResponse<Book> = yield call(getBookApi(id));
    yield put(setBookIntoState(book.data));
    yield put(setAppLoading(false));
  } catch (e) {
    yield ErrorSaga(e, "нет такой книги");
  }
}

function* EditBookSaga({ bookForm, id }: ReturnType<typeof EditBook>) {
  yield put(setAppLoading(true));
  try {
    const book: AxiosResponse<Book> = yield call(editBookApi(bookForm, id));
    yield put(setBookIntoState(book.data));
    yield put(setAppLoading(false));
    yield put(
      setAlert({
        type: "success",
        text: "все круто",
      })
    );
  } catch (e: any) {
    yield ErrorSaga(e, "штото пошло не так, проверьте правильность данных");
  }
}

function* DeleteBookSaga({ id, history }: ReturnType<typeof deleteBookAction>) {
  yield put(setAppLoading(true));
  try {
    yield call(deleteBookApi(id));
    yield put(setAlert({ type: "success", text: "Все круто книга удаллиася" }));
    yield put(setAppLoading(false));
    yield put(fetchBooks());
    history.push("/books");
  } catch (e) {
    yield ErrorSaga(e, "нет такой книги");
  }
}

export function* BooksWatcher() {
  yield takeEvery(MutationTypes.EDIT_BOOK, EditBookSaga);
  yield takeEvery(MutationTypes.DELETE_BOOK, DeleteBookSaga);
  yield takeEvery(MutationTypes.ADD_BOOK, AddBookSaga);
  yield takeEvery(MutationTypes.GET_BOOKS, GetBooksSaga);
  yield takeEvery(MutationTypes.GET_BOOK, GetBookSaga);
}

import { AxiosInstanse } from "../../helpers/axios";
import { call, takeEvery, put } from "redux-saga/effects";
import { BooksResponseType } from "../../entity/books.types";
import { MutationTypes } from "../../entity/mutation.types";
import { setBooks } from "../actions/books";
import { AxiosResponse } from "axios";
import { setAlert, setAppLoading } from "../actions/common";
const bo = () => AxiosInstanse.get("/api/books");

export function* BooksSaga() {
  yield put(setAppLoading(true));
  try {
    const books: AxiosResponse<BooksResponseType> = yield call(bo);
    console.log(books);
    yield put(setBooks(books.data));
    yield put(setAppLoading(false));
  } catch (e) {
    console.log(e);
    yield put(setAppLoading(false));
    yield put(setAlert({ type: "error", text: "штото пошло не так" }));
  }
}

export function* BooksWatcher() {
  yield takeEvery(MutationTypes.GET_BOOKS, BooksSaga);
}

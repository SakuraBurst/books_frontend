import { AxiosInstanse } from "../../helpers/axios";
import { call, takeEvery, put } from "redux-saga/effects";
import { BooksResponseType } from "../../entity/books.types";
import { MutationTypes } from "../../entity/mutation.types";
import { setBooks } from "../actions/books";
import { AxiosResponse } from "axios";
const bo = () => AxiosInstanse.get("/api/books");

export function* BooksSaga() {
  try {
    const books: AxiosResponse<BooksResponseType> = yield call(bo);
    console.log(books);
    yield put(setBooks(books.data));
  } catch (e) {
    console.log(e);
  }
}

export function* BooksWatcher() {
  yield takeEvery(MutationTypes.GET_BOOKS, BooksSaga);
}

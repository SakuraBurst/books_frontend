import { AxiosInstanse } from "../../helpers/axios";
import { call, takeEvery } from "redux-saga/effects";
import { BooksResponseType } from "../../entity/books.types";
import { MutationTypes } from "../../entity/mutation.types";
const bo = () => AxiosInstanse.get("/api/books");

export function* BooksSaga() {
  try {
    const books: BooksResponseType = yield call(bo);
    console.log(books);
  } catch (e) {
    console.log(e);
  }
}

export function* BooksWatcher() {
  yield takeEvery(MutationTypes.GET_BOOKS, BooksSaga);
}

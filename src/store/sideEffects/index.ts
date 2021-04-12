import { all } from "redux-saga/effects";
import { AuthWatcher } from "./auth";
import { BooksWatcher } from "./books";
export default function* rootSaga() {
  yield all([AuthWatcher(), BooksWatcher()]);
}

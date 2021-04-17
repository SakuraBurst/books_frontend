import { AxiosError } from "axios";
import { put } from "redux-saga/effects";
import { logoutAction } from "../actions/auth";
import { setAlert, setAppLoading } from "../actions/common";
import { LOCAL_STORAGE_KEY } from "./auth";

export function* ErrorSaga(e: AxiosError, text: string) {
  if (e.response?.status === 401) {
    localStorage.setItem(LOCAL_STORAGE_KEY, "");
    yield put(logoutAction());
    yield put(setAlert({ type: "error", text: "Вы должны авторизоваться" }));
  } else {
    yield put(setAlert({ type: "error", text }));
  }
  yield put(setAppLoading(false));
}

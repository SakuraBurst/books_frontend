import { UserResponseType } from "../../entity/user.types";
import { call, takeEvery, put } from "redux-saga/effects";
import { AxiosInstanse } from "../../helpers/axios";
import { firstAppLoading, setAlert, setAppLoading } from "../actions/common";
import {
  loginAction,
  loginActionSuccess,
  registrationAction,
} from "../actions/auth";
import { MutationTypes } from "../../entity/mutation.types";
import { AxiosResponse } from "axios";
import { AuthorizationForm, RegistrationForm } from "../../entity/form.types";
import { ErrorSaga } from "./errors";
const login = (data: AuthorizationForm) => () =>
  AxiosInstanse.post("/api/login", data);

const registration = (data: RegistrationForm) => () =>
  AxiosInstanse.post("/api/registration", data);

const getUser = () => AxiosInstanse.get("/api/v2/user");

export const LOCAL_STORAGE_KEY = "auth_key";

function* AuthSaga({ loginObj, history }: ReturnType<typeof loginAction>) {
  yield put(setAppLoading(true));
  try {
    const response: AxiosResponse<UserResponseType> = yield call(
      login(loginObj)
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, response.data.token);
    AxiosInstanse.defaults.headers["Authorization"] = response.data.token;
    yield put(loginActionSuccess(response.data));
    history.push("/books");
    yield put(setAppLoading(false));
  } catch (e) {
    console.log(e);
    yield ErrorSaga(
      e,
      "штото пошло не так, проверьте правильность вводимых данных"
    );
  }
}

function* RegistrationSaga({ newUser }: ReturnType<typeof registrationAction>) {
  yield put(setAppLoading(true));
  try {
    yield call(registration(newUser));
    // history.push("/books");
    yield put(
      setAlert({
        type: "success",
        text: "ты зарегался, заебись, теперь ты можешь с этими данными зайти",
      })
    );
    yield put(setAppLoading(false));
  } catch (e) {
    console.log(e);
    yield ErrorSaga(
      e,
      "штото пошло не так, проверьте правильность вводимых данных"
    );
  }
}

function* GetUserByTokenSaga() {
  try {
    const response: AxiosResponse<UserResponseType> = yield call(getUser);
    yield put(loginActionSuccess(response.data));
    yield put(firstAppLoading(false));
  } catch (e) {
    console.log(e.response);
    yield ErrorSaga(e, "Токен устарел");
    yield put(firstAppLoading(false));
  }
}

export function* AuthWatcher() {
  yield takeEvery(MutationTypes.GET_USER_BY_TOKEN, GetUserByTokenSaga);
  yield takeEvery(MutationTypes.REGISTRATION, RegistrationSaga);
  yield takeEvery(MutationTypes.LOGIN, AuthSaga);
}

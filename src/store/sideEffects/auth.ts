import { UserResponseType } from "../../entity/user.types";
import { call, takeEvery, put } from "redux-saga/effects";
import { AxiosInstanse } from "../../helpers/axios";
import { setAlert, setAppLoading } from "../actions/common";
import {
  loginAction,
  loginActionSuccess,
  registrationAction,
} from "../actions/auth";
import { MutationTypes } from "../../entity/mutation.types";
import { AxiosResponse } from "axios";
import { AuthorizationForm, RegistrationForm } from "../../entity/form.types";
const login = (data: AuthorizationForm) => () =>
  AxiosInstanse.post("/api/login", data);

const registration = (data: RegistrationForm) => () =>
  AxiosInstanse.post("/api/registration", data);

export function* AuthSaga({
  loginObj,
  history,
}: ReturnType<typeof loginAction>) {
  yield put(setAppLoading(true));
  console.log("dfdf");
  try {
    const response: AxiosResponse<UserResponseType> = yield call(
      login(loginObj)
    );
    console.log(response);
    yield put(loginActionSuccess(response.data));
    history.push("/books");
    yield put(setAppLoading(false));
  } catch (e) {
    console.log(e);
    yield put(setAppLoading(false));
    yield put(
      setAlert({
        type: "error",
        text: "штото пошло не так, проверьте правильность вводимых данных",
      })
    );
  }
}

export function* RegistrationSaga({
  newUser,
}: ReturnType<typeof registrationAction>) {
  yield put(setAppLoading(true));
  console.log("dfdfddddddd");
  try {
    const response: AxiosResponse<any> = yield call(registration(newUser));
    console.log(response);
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
    yield put(setAppLoading(false));
    yield put(
      setAlert({
        type: "error",
        text: "штото пошло не так, проверьте правильность вводимых данных",
      })
    );
  }
}
export function* AuthWatcher() {
  yield takeEvery(MutationTypes.REGISTRATION, RegistrationSaga);
  yield takeEvery(MutationTypes.LOGIN, AuthSaga);
}

import { UserResponseType } from "../../entity/user.types";
import { call, takeEvery } from "redux-saga/effects";
import { AxiosInstanse } from "../../helpers/axios";
import { MutationTypes } from "../../entity/mutation.types";

const login = () => AxiosInstanse.post("/api/login", { email: "dfdf@df.ru" });

export function* AuthSaga() {
  try {
    const user: UserResponseType = yield call(login);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
}
export function* AuthWatcher() {
  yield takeEvery(MutationTypes.LOGIN, AuthSaga);
}

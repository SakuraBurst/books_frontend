import { put, takeEvery, delay } from "redux-saga/effects";
import { removeAlert, removeAlertTimeout } from "../actions/common";
import { MutationTypes } from "../../entity/mutation.types";

export function* TimeoutSaga({
  alertId,
  timeout,
}: ReturnType<typeof removeAlertTimeout>) {
  if (alertId && timeout) {
    yield delay(timeout);
    yield put(removeAlert(alertId));
  }
}
export function* CommonWatcher() {
  yield takeEvery(MutationTypes.REMOVE_ALERT_TIMEOUT, TimeoutSaga);
}

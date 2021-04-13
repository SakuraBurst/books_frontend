import { MutationTypes } from "../../entity/mutation.types";
import { Alert, AlertMessage } from "../../entity/common.types";
import { store } from "../../index";

export const setAppLoading = (flag: boolean) =>
  <const>{
    type: MutationTypes.SET_LOADING,
    flag,
  };

export const setAlert = (alert: AlertMessage) => {
  const newAlert: Alert = {
    type: alert.type,
    text: alert.text,
    id: new Date().getTime(),
  };
  store.dispatch(removeAlertTimeout(newAlert.id, 5000));
  return <const>{
    type: MutationTypes.SET_ALERT,
    newAlert,
  };
};

export const removeAlertTimeout = (alertId: number, timeout: number) =>
  <const>{
    type: MutationTypes.REMOVE_ALERT_TIMEOUT,
    alertId,
    timeout,
  };

export const removeAlert = (alertId: number) =>
  <const>{
    type: MutationTypes.REMOVE_ALERT,
    alertId,
  };

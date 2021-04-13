import { CoolType } from "../actions";
import { MutationTypes } from "../../entity/mutation.types";
import { Alert } from "../../entity/common.types";

export interface CommonReducer {
  alerts: Array<Alert>;
  appLoading: boolean;
}

export const initialCommonStore: CommonReducer = {
  alerts: [],
  appLoading: false,
};

function removeAlert(state: CommonReducer, id: number): Array<Alert> {
  const newAlerts: Array<Alert> = [];
  for (let i = 0; i < state.alerts.length; i++) {
    if (state.alerts[i].id !== id) {
      newAlerts.push(state.alerts[i]);
    }
  }

  return newAlerts;
}

export default function commonReducer(
  state = initialCommonStore,
  action: CoolType
): CommonReducer {
  switch (action.type) {
    case MutationTypes.SET_LOADING:
      return {
        ...state,
        appLoading: action.flag,
      };
    case MutationTypes.SET_ALERT:
      return {
        ...state,
        alerts: [action.newAlert, ...state.alerts],
      };
    case MutationTypes.REMOVE_ALERT:
      return {
        ...state,
        alerts: removeAlert(state, action.alertId),
      };
    default:
      return state;
  }
}

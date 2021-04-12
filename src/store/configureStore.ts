import { applyMiddleware, createStore, Store, compose } from "redux";
import createReducers, { AppStore } from "./reducers";
import { CoolType } from "./actions";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sideEffects";
export default function configureStore(
  initialState: AppStore
): Store<AppStore, CoolType> {
  const saga = createSagaMiddleware();
  // @ts-ignore
  const composeEnhancers =
    // @ts-ignore
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  const enchancers = composeEnhancers(applyMiddleware(saga));
  const store = createStore<AppStore, CoolType, unknown, unknown>(
    createReducers(),
    initialState,
    enchancers
  );
  saga.run(rootSaga);
  return store;
}

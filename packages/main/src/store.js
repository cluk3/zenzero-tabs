import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { tabsReducer, windowsReducer, dragReducer } from "features/tabsSession";
import { uiReducer } from "features/ui";
import { watchStateAndActions } from "features/tabsSession/sagas";

export const setupStore = ({ reducers = {}, preloadedState } = {}) => {
  function* rootSaga() {
    yield all([watchStateAndActions()]);
  }

  const sagaMiddleware = createSagaMiddleware();

  const mainReducer = combineReducers({
    windows: windowsReducer,
    tabs: tabsReducer,
    drag: dragReducer,
    ui: uiReducer,
    ...reducers,
  });

  const store = configureStore({
    reducer: mainReducer,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

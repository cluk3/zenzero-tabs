import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { tabsReducer, windowsReducer } from "features/tabsSession";

export const setupStore = ({ reducers = {}, preloadedState } = {}) => {
  function* rootSaga() {
    yield all([]);
  }

  const sagaMiddleware = createSagaMiddleware();

  const mainReducer = combineReducers({
    windows: windowsReducer,
    tabs: tabsReducer,
    ...reducers,
  });

  const store = configureStore({
    reducer: mainReducer,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { tabsReducer, windowsReducer, dragReducer } from "features/tabsSession";
import { categoriesReducer, bookmarksReducer } from "features/bookmarks";
import { uiReducer } from "features/ui";
import { watchStateAndActions } from "features/tabsSession/sagas";
import {
  watchAppInit,
  syncBookmarksStateWithBrowser,
} from "features/bookmarks";
import { composeWithDevTools } from "remote-redux-devtools";

export const setupStore = ({ reducers = {}, preloadedState } = {}) => {
  const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
  function* rootSaga() {
    yield all([
      watchStateAndActions(),
      watchAppInit(),
      syncBookmarksStateWithBrowser(),
    ]);
  }

  const sagaMiddleware = createSagaMiddleware();

  const mainReducer = combineReducers({
    windows: windowsReducer,
    tabs: tabsReducer,
    drag: dragReducer,
    ui: uiReducer,
    bookmarks: bookmarksReducer,
    categories: categoriesReducer,
    ...reducers,
  });

  const middlewares = applyMiddleware(sagaMiddleware);

  const store = createStore(mainReducer, composeEnhancers(middlewares));

  sagaMiddleware.run(rootSaga);
  return store;
};

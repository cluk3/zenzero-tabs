import { takeEvery, select, call, take } from "redux-saga/effects";
import { closeTab } from "api/browser";
import { tabRemoved } from "features/tabsSession";

// TODO: use WeakMap
const lock = {};
export const watchStateAndActions = function* () {
  if (process.env.NODE_ENV === "development") {
    yield takeEvery("*", function* (action) {
      const state = yield select();
      console.debug(action, state);
    });
  }
  yield takeEvery("CLOSE_TAB_CLICKED", function* ({ payload: { tabId } }) {
    if (lock[tabId]) return;
    lock[tabId] = true;

    yield call(closeTab, tabId);

    yield take(tabRemoved);
    lock[tabId] = false;
  });
};

import { takeEvery, select } from "redux-saga/effects";

export const watchStateAndActions = function* () {
  if (process.env.NODE_ENV === "development") {
    yield takeEvery("*", function* (action) {
      const state = yield select();
      console.debug(action, state);
    });
  }
};

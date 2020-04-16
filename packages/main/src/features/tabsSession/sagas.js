import { takeEvery, select } from "redux-saga/effects";

export const watchStateAndActions = function* () {
  yield takeEvery("*", function* (action) {
    const state = yield select();
    console.debug(action, state);
  });
};

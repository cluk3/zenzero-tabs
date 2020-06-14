import {
  takeEvery,
  select,
  call,
  take,
  all,
  race,
  delay,
  put,
} from "redux-saga/effects";
import { closeTab, moveTabToNewWindow, createNewTab } from "api/browser";
import {
  tabRemoved,
  closeTabClicked,
  moveTabToNewWindowClicked,
  dedupTabsClicked,
  undoDedupClicked,
} from "./commonActions";
import {
  groupBy,
  prop,
  compose,
  filter,
  map,
  values,
  tail,
  flatten,
} from "ramda";
import { openSnackbar } from "features/ui";

const getDuplicatedTabs = compose(
  flatten,
  map(tail),
  values,
  filter((x) => x.length > 1),
  groupBy(prop("url"))
);

export const watchStateAndActions = function* () {
  if (process.env.NODE_ENV === "development") {
    yield takeEvery("*", function* (action) {
      const state = yield select();
      console.debug(action, state);
    });
  }
  yield takeEvery(
    closeTabClicked,
    withLock(function* ({ payload: tabId }) {
      yield call(closeTab, tabId);

      yield take(tabRemoved);
    })
  );
  yield takeEvery(
    moveTabToNewWindowClicked,
    withLock(function* ({ payload: tabId }) {
      yield call(moveTabToNewWindow, tabId);
    })
  );

  yield takeEvery(dedupTabsClicked, function* () {
    const tabs = yield select(({ tabs }) =>
      tabs.allIds.map((id) => tabs.byId[id])
    );

    const duplicatedTabs = getDuplicatedTabs(tabs);

    // TODO: manage 'no duplicated tabs' found

    if (duplicatedTabs.length === 0) {
      return yield put(
        openSnackbar({
          message: "No duplicated tabs found.",
        })
      );
    }

    yield all(duplicatedTabs.map((tab) => call(closeTab, tab.id)));

    const TIMEOUT = 5000;
    yield put(
      openSnackbar({
        message: `Closed ${duplicatedTabs.length} duplicated tabs`,
        action: undoDedupClicked(),
        actionButtonCopy: "UNDO",
        timeout: TIMEOUT,
      })
    );

    const { undo } = yield race({
      undo: take(undoDedupClicked),
      timeout: delay(TIMEOUT),
    });

    if (undo) {
      yield all(
        duplicatedTabs.map((tab) =>
          call(createNewTab, {
            url: tab.url,
            active: false,
            windowId: tab.windowId,
          })
        )
      );
    }
  });
};

function withLock(saga, keyGetter = prop("payload")) {
  const lock = {};
  return function* (...args) {
    const key = keyGetter(args[0]);
    if (lock[key]) return;
    lock[key] = true;
    yield saga(...args);
    lock[key] = false;
  };
}

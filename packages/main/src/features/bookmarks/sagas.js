import { call, take, put, takeEvery, select } from "redux-saga/effects";
import {
  getAppBookmarksFolder,
  saveBookmark as saveBookmarkInBrowser,
} from "api/bookmarks";
import { closeTab, createNewTab } from "api/browser";
import { flatten, concat, mergeDeepWithKey } from "ramda";
import {
  hydrateBookmarks,
  saveBookmarkClicked,
  saveBookmark,
  openBookmarkInWindow,
} from "./commonActions";
import { find, propEq, compose, prop } from "ramda";

export function* watchAppInit() {
  yield take("APP_INIT");
  const { children: bookmarksFolders } = yield call(getAppBookmarksFolder);

  const categories = {
    allIds: bookmarksFolders.map((child) => child.title),
    byId: bookmarksFolders.reduce(
      (byId, child) => ({
        ...byId,
        [child.title]: { bookmarks: child.children.map((b) => b.url) },
      }),
      {}
    ),
  };
  const raw = flatten(
    bookmarksFolders.map((tag) => {
      return tag.children.reduce(
        (acc, bookmark) => ({
          ...acc,
          [bookmark.url]: {
            title: bookmark.title,
            dateAdded: bookmark.dateAdded,
            tags: [tag.title],
          },
        }),
        {}
      );
    })
  );

  const bookmarks = {
    allIds: [
      ...bookmarksFolders.reduce((set, tag) => {
        tag.children.forEach((b) => set.add(b.url));
        return set;
      }, new Set()),
    ],
    byId: raw.reduce(
      mergeDeepWithKey((key, a, b) => {
        if (key === "dateAdded") return Math.min(a, b);
        if (key === "tags") return concat(a, b);
        return a;
      }),
      {}
    ),
  };

  yield put(hydrateBookmarks({ bookmarks, categories }));
}

const getFocusedWindowId = compose(prop("id"), find(propEq("focused", true)));

export function* syncBookmarksStateWithBrowser() {
  yield takeEvery(saveBookmarkClicked, watchSaveBookmarksClicked);
  yield takeEvery(openBookmarkInWindow, function* ({ payload: bookmarkUrl }) {
    const windowId = yield select((state) =>
      getFocusedWindowId(state.windows.byId)
    );
    yield call(createNewTab, { url: bookmarkUrl, active: false, windowId });
  });
}

function* watchSaveBookmarksClicked({ payload }) {
  const { categories, bookmark, shouldCloseTab, tabId } = payload;
  yield call(saveBookmarkInBrowser, categories, bookmark);
  yield put(saveBookmark(payload));
  if (shouldCloseTab) {
    yield call(closeTab, tabId);
  }
}

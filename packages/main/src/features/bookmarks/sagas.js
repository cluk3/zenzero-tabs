import { call, take, put, takeEvery } from "redux-saga/effects";
import {
  getAppBookmarksFolder,
  saveBookmark as saveBookmarkInBrowser,
} from "api/bookmarks";
import { flatten, concat, mergeDeepWith, is } from "ramda";
import {
  hydrateBookmarks,
  saveBookmarkClicked,
  saveBookmark,
} from "./commonActions";

export function* watchAppInit() {
  yield take("APP_INIT");
  const appBookmarksFolder = yield call(getAppBookmarksFolder);

  const categories = {
    allIds: appBookmarksFolder.map((child) => child.title),
    byId: appBookmarksFolder.reduce(
      (byId, child) => ({
        ...byId,
        [child.title]: { bookmarks: child.children.map((b) => b.url) },
      }),
      {}
    ),
  };
  const raw = flatten(
    appBookmarksFolder.map((tag) => {
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
      ...appBookmarksFolder.reduce((set, tag) => {
        tag.children.forEach((b) => set.add(b.url));
        return set;
      }, new Set()),
    ],
    byId: raw.reduce(
      mergeDeepWith((a, b) => {
        return is(Number, a) ? Math.min(a, b) : concat(a, b);
      }),
      {}
    ),
  };

  yield put(hydrateBookmarks({ bookmarks, categories }));
}

export function* syncBookmarksStateWithBrowser() {
  yield takeEvery(saveBookmarkClicked, watchSaveBookmarksClicked);
}

function* watchSaveBookmarksClicked({ payload }) {
  const { categories, bookmark } = payload;
  yield call(saveBookmarkInBrowser, categories, bookmark);
  yield put(saveBookmark(payload));
}

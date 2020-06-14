import { call, take, put, takeEvery, select } from "redux-saga/effects";
import {
  getOrCreateExtensionFolder,
  saveBookmark as saveBookmarkInBrowser,
  deleteBookmark as deleteBookmarkInBrowser,
} from "api/bookmarks";
import { closeTab, createNewTab } from "api/browser";
import { flatten, concat, mergeDeepWithKey, isEmpty } from "ramda";
import {
  hydrateBookmarks,
  saveBookmarkClicked,
  deleteBookmarkClicked,
  saveBookmark,
  removeBookmark,
  openBookmarkInWindow,
  addCategoriesToBookmark,
  removeCategoriesFromBookmark,
} from "./commonActions";
import { find, propEq, compose, prop } from "ramda";

export function* watchAppInit() {
  yield take("APP_INIT");

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension"
    );
    console.log(request, sender);
  });
  const { children: bookmarksFolders } = yield call(getOrCreateExtensionFolder);

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
            categories: [tag.title],
            url: bookmark.url,
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
        if (key === "categories") return concat(a, b);
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
  yield takeEvery(deleteBookmarkClicked, watchDeleteBookmarkClicked);
  yield takeEvery(openBookmarkInWindow, function* ({ payload: bookmarkUrl }) {
    const windowId = yield select((state) =>
      getFocusedWindowId(state.windows.byId)
    );
    yield call(createNewTab, { url: bookmarkUrl, active: false, windowId });
  });
}

function* watchSaveBookmarksClicked({ payload }) {
  const { categories, bookmark, shouldCloseTab, tabId, isEdit } = payload;
  if (isEdit) {
    yield editBookmark(categories, bookmark);
  } else {
    yield call(saveBookmarkInBrowser, categories, bookmark);
    yield put(saveBookmark({ bookmark, categories: categories }));
  }
  //TODO: put at top of the function
  if (shouldCloseTab) {
    yield call(closeTab, tabId);
  }
}

function* watchDeleteBookmarkClicked({ payload }) {
  const { bookmark, shouldCloseTab, tabId, categories } = payload;
  yield call(deleteBookmarkInBrowser, bookmark, categories);
  yield put(removeBookmark(payload));
  if (shouldCloseTab) {
    yield call(closeTab, tabId);
  }
}

function* editBookmark(categories, bookmark) {
  if (!isEmpty(categories.toAdd)) {
    yield call(saveBookmarkInBrowser, categories.toAdd, bookmark);
    yield put(
      addCategoriesToBookmark({
        bookmarkUrl: bookmark.url,
        categories: categories.toAdd,
      })
    );
  }
  if (!isEmpty(categories.toRemove)) {
    yield call(deleteBookmarkInBrowser, categories.toRemove, bookmark);
    yield put(
      removeCategoriesFromBookmark({
        bookmarkUrl: bookmark.url,
        categories: categories.toRemove,
      })
    );
  }
}

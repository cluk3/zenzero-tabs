import { call, take, put } from "redux-saga/effects";
import browser from "webextension-polyfill";
import { propEq, flatten, concat, mergeDeepWith, is } from "ramda";
import S from "sanctuary";
import $ from "sanctuary-def";
import { hydrateBookmarks } from "./commonActions";
const APP_BOOKMARKS_FOLDER = "ZenzeroTabs";

const getZenzeroBookmarks = S.pipeK([
  S.head,
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", "Other Bookmarks")),
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", APP_BOOKMARKS_FOLDER)),
  S.get(S.is($.Array($.Object)))("children"),
]);

export function* watchAppInit() {
  yield take("APP_INIT");
  const tree = yield call([browser.bookmarks, "getTree"]);
  let appBookmarksFolder = S.fromMaybe([])(getZenzeroBookmarks(S.Just(tree)));
  if (!appBookmarksFolder.length) {
    appBookmarksFolder = yield call([browser.bookmarks, "create"], {
      title: APP_BOOKMARKS_FOLDER,
    });
  }

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

import { call, take } from "redux-saga/effects";
import browser from "webextension-polyfill";
import { propEq } from "ramda";
import S from "sanctuary";
import $ from "sanctuary-def";

const getZenzeroBookmarks = S.pipeK([
  S.head,
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", "Other Bookmarks")),
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", "ZenzeroTabs")),
  S.get(S.is($.Array($.Object)))("children"),
]);

export function* watchAppInit() {
  yield take("APP_INIT");
  const tree = yield call([browser.bookmarks, "getTree"]);
  let zenzeroFolder = S.fromMaybe([])(getZenzeroBookmarks(S.Just(tree)));
  if (!zenzeroFolder.length) {
    zenzeroFolder = yield call([browser.bookmarks, "create"], {
      title: "ZenzeroTabs",
    });
  }
}

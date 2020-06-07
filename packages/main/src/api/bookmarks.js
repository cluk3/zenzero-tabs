import browser from "webextension-polyfill";
import { propEq } from "ramda";
import S from "sanctuary";
import $ from "sanctuary-def";

import { bindActionCreators } from "redux";
import {
  bookmarkCreated,
  bookmarkRemoved,
  bookmarkChanged,
  bookmarkMoved,
} from "features/bookmarks";

import { ON_REMOVED, ON_CREATED, ON_CHANGED, ON_MOVED } from "./events";

const actions = {
  bookmarkCreated,
  bookmarkRemoved,
  bookmarkChanged,
  bookmarkMoved,
};
export const initSync = (dispatch) => {
  const {
    bookmarkCreated,
    bookmarkRemoved,
    bookmarkChanged,
    bookmarkMoved,
  } = bindActionCreators(actions, dispatch);

  const bookmarksHandlers = {
    [ON_REMOVED]: (id, { parentId, index, bookmarkTreeNode }) => {
      bookmarkRemoved(id, parentId);
    },
    [ON_CREATED]: (id, bookmarkTreeNode) => {
      bookmarkCreated(tabId, windowId);
    },
    [ON_CHANGED]: (id, { title, url }) => {
      bookmarkChanged(tabId, windowId);
    },
    [ON_MOVED]: (id, { parentId, index, oldParentId, oldIndex }) => {
      bookmarkMoved(tabId, windowId);
    },
  };

  Object.entries(bookmarksHandlers).forEach(([event, handler]) =>
    browser.bookmarks[event].addListener(handler)
  );

  return () => {
    Object.entries(bookmarksHandlers).forEach(([event, handler]) =>
      browser.bookmarks[event].removeListener(handler)
    );
  };
};

const APP_BOOKMARKS_FOLDER = "ZenzeroTabs";
let appBookmarksFolder;
const getZenzeroBookmarks = S.pipeK([
  S.head,
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", "Other Bookmarks")),
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", APP_BOOKMARKS_FOLDER)),
  S.get(S.is($.Array($.Object)))("children"),
]);

export const getAppBookmarksFolder = async () => {
  if (appBookmarksFolder) return appBookmarksFolder;

  const tree = await browser.bookmarks.getTree();
  appBookmarksFolder = S.fromMaybe([])(getZenzeroBookmarks(S.Just(tree)));
  if (!appBookmarksFolder.length) {
    appBookmarksFolder = await browser.bookmarks.create({
      title: APP_BOOKMARKS_FOLDER,
    });
  }
  return appBookmarksFolder;
};

export const saveBookmark = async (categories, bookmark) => {
  // get all categories folder id
  const categoriesFolderId = await getCategoriesFolderId(categories);
  // for each category, save the bookmark into it
  return await Promise.all(
    categoriesFolderId.map(async (folderId) => {
      return await browser.bookmarks.create({
        parentId: folderId,
        title: bookmark.title,
        url: bookmark.url,
      });
    })
  );
};

const getCategoriesFolderId = async (categories) => {
  const appBookmarksFolder = await getAppBookmarksFolder();
  return await Promise.all(
    categories.map(async (category) => {
      let categoryFolder = appBookmarksFolder.find((x) => x.title === category);
      // if category exists, return it

      // otherwise create and return
      if (!categoryFolder) {
        categoryFolder = await browser.bookmarks.create({
          parentId: appBookmarksFolder.id,
          title: category,
        });
      }

      return categoryFolder.id;
    })
  );
};

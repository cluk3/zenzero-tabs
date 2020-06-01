import browser from "webextension-polyfill";

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

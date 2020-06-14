import browser from "webextension-polyfill";
import { propEq, isEmpty } from "ramda";
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

const safeGetExtensionFolder = S.pipeK([
  S.head,
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", "Other Bookmarks")),
  S.get(S.is($.Array($.Object)))("children"),
  S.find(propEq("title", APP_BOOKMARKS_FOLDER)),
]);

export const getOrCreateExtensionFolder = async () => {
  const tree = await browser.bookmarks.getTree();
  let extensionFolder = S.fromMaybe({})(safeGetExtensionFolder(S.Just(tree)));
  if (isEmpty(extensionFolder)) {
    extensionFolder = await browser.bookmarks.create({
      title: APP_BOOKMARKS_FOLDER,
    });
  }
  return extensionFolder;
};

export const saveBookmark = async (categories, bookmark) => {
  // get all categories folder id
  const categoriesFolders = await getCategoriesFolders(categories);
  // for each category, save the bookmark into it
  return await Promise.all(
    categoriesFolders.map(async (folder) => {
      return await browser.bookmarks.create({
        parentId: folder.id,
        title: bookmark.title,
        url: bookmark.url,
      });
    })
  );
};

export const deleteBookmark = async (categories, bookmark) => {
  // get all categories folder id
  const categoriesFolders = await getCategoriesFolders(categories);
  // for each category, save the bookmark into it
  return await Promise.all(
    categoriesFolders.map(async (folder) => {
      const { id: childId } = folder.children.find(
        (child) => child.url === bookmark.url
      );
      return await browser.bookmarks.remove(childId);
    })
  );
};

const getCategoriesFolders = async (categories) => {
  const extensionFolder = await getOrCreateExtensionFolder();
  return await Promise.all(
    categories.map(async (category) => {
      let categoryFolder = extensionFolder.children.find(
        (x) => x.title === category
      );
      // if category exists, return it

      // otherwise create and return
      if (!categoryFolder) {
        categoryFolder = await browser.bookmarks.create({
          parentId: extensionFolder.id,
          title: category,
        });
      }

      return categoryFolder;
    })
  );
};

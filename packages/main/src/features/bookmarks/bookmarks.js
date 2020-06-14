import { createReducer } from "@reduxjs/toolkit";
import {
  removeCategoriesFromBookmark,
  addCategoriesToBookmark,
  saveBookmark,
  removeBookmark,
  hydrateBookmarks,
} from "./commonActions";

import { deleteInPlace } from "utils";

export const bookmarksReducer = createReducer(
  {
    byId: {},
    allIds: [],
  },
  (builder) => {
    builder.addCase(
      saveBookmark,
      (state, { payload: { bookmark, categories } }) => {
        state.byId[bookmark.url] = { ...bookmark, categories };
        state.allIds.push(bookmark.url);
      }
    );
    builder.addCase(removeBookmark, (state, { payload: { bookmark } }) => {
      delete state.byId[bookmark.url];
      deleteInPlace(bookmark.url, state.allIds);
    });
    builder.addCase(
      addCategoriesToBookmark,
      ({ byId }, { payload: { categories, bookmarkUrl } }) => {
        byId[bookmarkUrl].categories.push(...categories);
      }
    );
    builder.addCase(
      removeCategoriesFromBookmark,
      ({ byId }, { payload: { categories, bookmarkUrl } }) => {
        categories.forEach((categoryName) =>
          deleteInPlace(categoryName, byId[bookmarkUrl].categories)
        );
      }
    );
    builder.addCase(hydrateBookmarks, (state, { payload: { bookmarks } }) => {
      state.allIds.push(...bookmarks.allIds);
      state.byId = { ...bookmarks.byId };
    });
  }
);

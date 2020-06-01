import { createReducer } from "@reduxjs/toolkit";
import {
  removeCategoryFromBookmark,
  addCategoriesToBookmark,
  addBookmark,
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
    builder.addCase(addBookmark, (state, { payload: bookmark, categories }) => {
      state.byId[bookmark.id] = { ...bookmark, categories };
      state.allIds.push(bookmark.id);
    });
    builder.addCase(
      removeBookmark,
      ({ byId, allIds }, { payload: { categoryName } }) => {
        delete byId[categoryName];
        deleteInPlace(categoryName, allIds);
      }
    );
    builder.addCase(
      addCategoriesToBookmark,
      ({ byId }, { payload: { categories, bookmarkId } }) => {
        byId[bookmarkId].category.push(...categories);
      }
    );
    builder.addCase(
      removeCategoryFromBookmark,
      ({ byId }, { payload: { categoryName, bookmarkId } }) => {
        deleteInPlace(categoryName, byId[bookmarkId].categories);
      }
    );
    builder.addCase(
      hydrateBookmarks,
      ({ byId, allIds }, { payload: { bookmarks } }) => {
        allIds.push(bookmarks.allIds);
        byId = { ...bookmarks.byId };
      }
    );
  }
);

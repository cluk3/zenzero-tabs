import { createReducer } from "@reduxjs/toolkit";
import {
  addCategory,
  removeCategory,
  addCategoriesToBookmark,
  saveBookmark,
  removeBookmark,
  hydrateBookmarks,
  removeCategoryFromBookmark,
} from "./commonActions";
import { uniq } from "ramda";

import { deleteInPlace } from "utils";

export const categoriesReducer = createReducer(
  {
    byId: {},
    allIds: [],
  },
  (builder) => {
    builder.addCase(addCategory, (state, { payload: categoryName }) => {
      state.byId[categoryName] = { bookmarks: [] };
      state.allIds.push(categoryName);
    });
    builder.addCase(
      removeCategory,
      ({ byId, allIds }, { payload: { categoryName } }) => {
        delete byId[categoryName];
        deleteInPlace(categoryName, allIds);
      }
    );
    builder.addCase(
      addCategoriesToBookmark,
      (state, { payload: { categories, bookmarkId } }) => {
        categories.forEach((categoryName) => {
          if (state.byId[categoryName]) {
            state.byId[categoryName].bookmarks.push(bookmarkId);
          } else {
            state.byId[categoryName] = {
              bookmarks: [bookmarkId],
            };
          }
        });
        state.allIds = uniq([...state.allIds, ...categories]);
      }
    );
    builder.addCase(
      saveBookmark,
      (state, { payload: { categories, bookmark } }) => {
        categories.forEach((categoryName) => {
          if (state.byId[categoryName]) {
            state.byId[categoryName].bookmarks.push(bookmark.url);
          } else {
            state.byId[categoryName] = {
              bookmarks: [bookmark.url],
            };
          }
        });
        state.allIds = uniq([...state.allIds, ...categories]);
      }
    );
    builder.addCase(
      removeCategoryFromBookmark,
      ({ byId }, { payload: { categoryName, bookmarkId } }) => {
        deleteInPlace(bookmarkId, byId[categoryName].bookmarks);
      }
    );
    builder.addCase(
      removeBookmark,
      ({ byId }, { payload: { categories, bookmarkId } }) => {
        categories.forEach((categoryName) => {
          deleteInPlace(bookmarkId, byId[categoryName].bookmarks);
        });
      }
    );
    builder.addCase(hydrateBookmarks, (state, { payload: { categories } }) => {
      state.allIds = [...categories.allIds];
      state.byId = { ...categories.byId };
    });
  }
);

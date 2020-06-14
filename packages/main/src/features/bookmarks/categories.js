import { createReducer } from "@reduxjs/toolkit";
import {
  addCategory,
  removeCategory,
  addCategoriesToBookmark,
  saveBookmark,
  removeBookmark,
  hydrateBookmarks,
  removeCategoriesFromBookmark,
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
      (state, { payload: { categories, bookmarkUrl } }) => {
        categories.forEach((categoryName) => {
          if (state.byId[categoryName]) {
            state.byId[categoryName].bookmarks.push(bookmarkUrl);
          } else {
            state.byId[categoryName] = {
              bookmarks: [bookmarkUrl],
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
      removeCategoriesFromBookmark,
      ({ byId }, { payload: { categories, bookmarkUrl } }) => {
        categories.forEach((categoryName) =>
          deleteInPlace(bookmarkUrl, byId[categoryName].bookmarks)
        );
      }
    );
    builder.addCase(
      removeBookmark,
      ({ byId }, { payload: { categories, bookmark } }) => {
        categories.forEach((categoryName) => {
          deleteInPlace(bookmark.url, byId[categoryName].bookmarks);
        });
      }
    );
    builder.addCase(hydrateBookmarks, (state, { payload: { categories } }) => {
      state.allIds = [...categories.allIds];
      state.byId = { ...categories.byId };
    });
  }
);

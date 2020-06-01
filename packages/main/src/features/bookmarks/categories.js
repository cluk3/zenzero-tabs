import { createReducer } from "@reduxjs/toolkit";
import {
  addCategory,
  removeCategory,
  addCategoriesToBookmark,
  removeBookmark,
  hydrateBookmarks,
  removeCategoryFromBookmark,
} from "./commonActions";

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
      ({ byId }, { payload: { categories, bookmarkId } }) => {
        categories.forEach((categoryName) => {
          byId[categoryName].bookmarks.push(bookmarkId);
        });
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
    builder.addCase(
      hydrateBookmarks,
      ({ byId, allIds }, { payload: { categories } }) => {
        allIds.push(categories.allIds);
        byId = { ...categories.byId };
      }
    );
  }
);

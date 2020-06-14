import { createAction } from "@reduxjs/toolkit";

export const addCategory = createAction("addCategory");
export const removeCategory = createAction("removeCategory");
export const addCategoriesToBookmark = createAction("addCategoriesToBookmark");
export const removeBookmark = createAction("removeBookmark");
export const saveBookmark = createAction("saveBookmark");
export const saveBookmarkClicked = createAction("saveBookmarkClicked");
export const deleteBookmarkClicked = createAction("deleteBookmarkClicked");
export const hydrateBookmarks = createAction("hydrateBookmarks");
export const removeCategoriesFromBookmark = createAction(
  "removeCategoriesFromBookmark"
);

export const openBookmarkInWindow = createAction("openBookmarkInWindow");

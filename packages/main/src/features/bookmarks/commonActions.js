import { createAction } from "@reduxjs/toolkit";

export const addCategory = createAction("addCategory");
export const removeCategory = createAction("removeCategory");
export const addCategoriesToBookmark = createAction("addCategoriesToBookmark");
export const removeBookmark = createAction("removeBookmark");
export const addBookmark = createAction("addBookmark");
export const hydrateBookmarks = createAction("hydrateBookmarks");
export const removeCategoryFromBookmark = createAction(
  "removeCategoryFromBookmark"
);

export const addToBookmarksClicked = createAction("addToBookmarksClicked");
export const removeFromBookmarksClicked = createAction(
  "removeFromBookmarksClicked"
);

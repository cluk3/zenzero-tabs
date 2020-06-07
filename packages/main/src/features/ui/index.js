import { createReducer, createAction } from "@reduxjs/toolkit";

export const sidebarToggleClicked = createAction("sidebarToggleClicked");
export const addBookmarkClicked = createAction("addBookmarkClicked");
export const closeAddBookmarkModal = createAction("closeAddBookmarkModal");

export const uiReducer = createReducer(
  {
    sidebar: { isOpen: false },
    addBookmarkModal: { isOpen: false, tabId: null },
  },
  {
    [sidebarToggleClicked]: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    [addBookmarkClicked]: (state, { payload }) => {
      console.log("payload", payload);
      state.addBookmarkModal.isOpen = true;
      state.addBookmarkModal.tabId = payload;
    },
    [closeAddBookmarkModal]: (state) => {
      state.addBookmarkModal.isOpen = false;
    },
  }
);

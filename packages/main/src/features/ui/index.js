import { createReducer, createAction } from "@reduxjs/toolkit";
import { undoDedupClicked } from "features/tabsSession";

export const sidebarToggleClicked = createAction("sidebarToggleClicked");
export const addBookmarkClicked = createAction("addBookmarkClicked");
export const editBookmarksClicked = createAction("editBookmarksClicked");
export const closeAddBookmarkModal = createAction("closeAddBookmarkModal");
export const openSnackbar = createAction("openSnackbar");
export const closeSnackbar = createAction("closeSnackbar");

export const uiReducer = createReducer(
  {
    sidebar: { isOpen: false },
    addBookmarkModal: { isOpen: false, tabId: null },
    snackbar: {
      isOpen: false,
      message: "",
      action: null,
      actionButtonCopy: "",
      timeout: 3000,
    },
  },
  {
    [sidebarToggleClicked]: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    [addBookmarkClicked]: (state, { payload }) => {
      state.addBookmarkModal = {
        isOpen: true,
        tabId: payload,
      };
    },
    [editBookmarksClicked]: (state, { payload }) => {
      state.addBookmarkModal = {
        isOpen: true,
        tabId: payload,
      };
    },
    [closeAddBookmarkModal]: (state) => {
      state.addBookmarkModal = {
        isOpen: false,
        tabId: null,
      };
    },
    [openSnackbar]: (state, { payload }) => {
      const { message, action, actionButtonCopy, timeout } = payload;
      state.snackbar = {
        isOpen: true,
        message,
        action,
        actionButtonCopy,
        timeout,
      };
    },
    [closeSnackbar]: setSnackbarClosed,
    [undoDedupClicked]: setSnackbarClosed,
  }
);

function setSnackbarClosed(state) {
  state.snackbar = {
    isOpen: false,
    message: "",
    action: null,
    actionButtonCopy: "",
  };
}

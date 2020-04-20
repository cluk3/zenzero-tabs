import { createReducer, createAction } from "@reduxjs/toolkit";

export const sidebarToggleClicked = createAction("sidebarToggleClicked");

export const uiReducer = createReducer(
  { sidebar: { isOpen: true } },
  {
    [sidebarToggleClicked]: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
  }
);

import { createAction, createReducer } from "@reduxjs/toolkit";

export const startDrag = createAction("dragTab/start");
export const endDrag = createAction("dragTab/end");

export const dragReducer = createReducer(
  { tabId: null, index: null, windowId: null },
  (builder) => {
    builder.addCase(startDrag, (state, { payload }) => {
      state.tabId = payload.tabId;
      state.index = payload.index;
      state.windowId = payload.windowId;
    });
    builder.addCase(endDrag, (state) => {
      state.tabId = null;
      state.index = null;
      state.windowId = null;
    });
  }
);

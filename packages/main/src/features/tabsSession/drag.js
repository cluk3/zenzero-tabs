import { createAction, createReducer } from "@reduxjs/toolkit";

export const startDrag = createAction("dragTab/start", (tabId) => {
  return {
    payload: {
      tabId,
    },
  };
});
export const endDrag = createAction("dragTab/end");

export const dragReducer = createReducer({ tabId: null }, (builder) => {
  builder.addCase(startDrag, (state, { payload }) => {
    state.tabId = payload.tabId;
  });
  builder.addCase(endDrag, (state) => {
    state.tabId = null;
  });
});

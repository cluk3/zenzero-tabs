import { createSlice } from "@reduxjs/toolkit";
import {
  addWindow,
  removeWindow,
  addTab,
  removeTab,
  attachTab,
  detachTab,
  moveTab,
  addWindows,
} from "./commonActions";

import uniq from "ramda/src/uniq";
import move from "ramda/src/move";
import { deleteInPlace } from "utils";

// TODO: change to createReducer
const windowsSlice = createSlice({
  name: "windows",
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addWindow, (state, { payload: window }) => {
      state.byId[window.id] = {
        ...window,
        tabs: (window.tabs || []).map((t) => t.id),
      };
      state.allIds = uniq([...state.allIds, window.id]);
    });
    builder.addCase(addWindows, (state, { payload: { windows } }) => {
      windows.forEach((w) => {
        state.byId[w.id] = {
          ...w,
          tabs: (w.tabs || []).map((tab) => tab.id),
        };
        state.allIds = uniq([...state.allIds, w.id]);
      });
    });
    builder.addCase(removeWindow, (state, action) => {
      const { windowId } = action.payload;
      delete state.byId[windowId];
      deleteInPlace(windowId, state.allIds);
    });
    builder.addCase(addTab, (state, action) => {
      const { tab } = action.payload;
      state.byId[tab.windowId].tabs.push(tab.id);
    });
    builder.addCase(removeTab, (state, action) => {
      const { windowId, tabId } = action.payload;
      const { tabs } = state.byId[windowId];
      deleteInPlace(tabId, tabs);
    });
    builder.addCase(attachTab, (state, action) => {
      const { windowId, tabId, position } = action.payload;
      state.byId[windowId].tabs.splice(position, 0, tabId);
    });
    builder.addCase(detachTab, (state, action) => {
      const { windowId, tabId } = action.payload;
      const { tabs } = state.byId[windowId];
      deleteInPlace(tabId, tabs);
    });
    builder.addCase(moveTab, (state, action) => {
      const { tabId, fromIndex, toIndex, windowId } = action.payload;
      const { tabs } = state.byId[windowId];

      state.byId[windowId].tabs = move(tabs.indexOf(tabId), toIndex, tabs);
    });
  },
});

export const { reducer } = windowsSlice;

import { createSlice } from "@reduxjs/toolkit";
import {
  windowCreated,
  windowRemoved,
  tabCreated,
  tabRemoved,
  tabAttached,
  windowsRetrieved,
  tabDragEnded,
} from "./commonActions";

import { partition, uniq } from "ramda";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: (builder) => {
    builder.addCase(tabCreated, (state, { payload }) => {
      const { tab } = payload;
      state.byId[tab.id] = { ...tab };
      state.allIds.push(tab.id);
    });
    builder.addCase(tabRemoved, (state, action) => {
      const { tabId } = action.payload;
      delete state.byId[tabId];
      state.allIds.splice(state.allIds.indexOf(tabId), 1);
    });
    builder.addCase(windowCreated, (state, action) => {
      const { tabs = [] } = action.payload;
      tabs.forEach((tab) => {
        state.byId[tab.id] = { ...tab };
      });
      state.allIds = uniq([...state.allIds, ...tabs.map((t) => t.id)]);
    });
    builder.addCase(windowsRetrieved, (state, { payload: { windows } }) => {
      windows.forEach(({ tabs }) => {
        tabs.forEach((tab) => {
          state.byId[tab.id] = { ...tab };
        });
        state.allIds = uniq([...state.allIds, ...tabs.map((t) => t.id)]);
      });
    });
    builder.addCase(windowRemoved, (state, action) => {
      const { windowId } = action.payload;
      const [survivors, toDelete] = partition(
        (tabId) => {
          const tab = state.byId[tabId];
          return tab.windowId !== windowId;
        },
        [...state.allIds]
      );
      state.allIds = survivors;
      toDelete.forEach((id) => {
        delete state.byId[id];
      });
    });
    builder.addCase(tabAttached, (state, action) => {
      const { windowId, tabId } = action.payload;
      state.byId[tabId].windowId = windowId;
    });
    builder.addCase(tabDragEnded, (state, action) => {
      const { tabId, sourceWindowId, destinationWindowId } = action.payload;
      if (sourceWindowId !== destinationWindowId) {
        state.byId[tabId].windowId = destinationWindowId;
      }
    });
  },
  reducers: {
    updateTab: {
      reducer(state, action) {
        const { tab } = action.payload;
        state.byId[tab.id] = { ...tab };
      },
      prepare(tab) {
        return {
          payload: {
            tab,
          },
        };
      },
    },
  },
});

export const { reducer, actions } = tabsSlice;

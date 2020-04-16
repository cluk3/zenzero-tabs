import { createSlice } from "@reduxjs/toolkit";
import {
  addWindow,
  removeWindow,
  addTab,
  removeTab,
  attachTab,
  addWindows,
} from "./commonActions";

import partition from "ramda/src/partition";
import uniq from "ramda/src/uniq";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addTab, (state, { payload }) => {
      const { tab } = payload;
      state.byId[tab.id] = { ...tab };
      state.allIds.push(tab.id);
    });
    builder.addCase(removeTab, (state, action) => {
      const { tabId } = action.payload;
      delete state.byId[tabId];
      state.allIds.splice(state.allIds.indexOf(tabId), 1);
    });
    builder.addCase(addWindow, (state, action) => {
      const { tabs = [] } = action.payload;
      tabs.forEach((tab) => {
        state.byId[tab.id] = { ...tab };
      });
      state.allIds = uniq([...state.allIds, ...tabs.map((t) => t.id)]);
    });
    builder.addCase(addWindows, (state, { payload: { windows } }) => {
      windows.forEach(({ tabs }) => {
        tabs.forEach((tab) => {
          state.byId[tab.id] = { ...tab };
        });
        state.allIds = uniq([...state.allIds, ...tabs.map((t) => t.id)]);
      });
    });
    builder.addCase(removeWindow, (state, action) => {
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
    builder.addCase(attachTab, (state, action) => {
      const { windowId, tabId } = action.payload;
      state.byId[tabId].windowId = windowId;
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

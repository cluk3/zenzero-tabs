import { createReducer } from "@reduxjs/toolkit";
import {
  windowCreated,
  windowRemoved,
  tabCreated,
  tabRemoved,
  tabAttached,
  tabDetached,
  tabMoved,
  windowsRetrieved,
  tabDragEnded,
} from "./commonActions";

import uniq from "ramda/src/uniq";
import move from "ramda/src/move";
import { deleteInPlace } from "utils";

const addWindow = (state, window) => {
  state.byId[window.id] = {
    ...window,
    tabs: (window.tabs || []).map((t) => t.id),
  };
  state.allIds = uniq([...state.allIds, window.id]);
};

const insertTab = (tabList, index, tabId) => {
  tabList.splice(index, 0, tabId);
};

export const windowsReducer = createReducer(
  {
    byId: {},
    allIds: [],
  },
  (builder) => {
    builder.addCase(windowCreated, (state, { payload: window }) => {
      addWindow(state, window);
    });
    builder.addCase(windowsRetrieved, (state, { payload: { windows } }) => {
      windows.forEach((w) => {
        addWindow(state, w);
      });
    });
    builder.addCase(windowRemoved, ({ byId, allIds }, action) => {
      const { windowId } = action.payload;
      delete byId[windowId];
      deleteInPlace(windowId, allIds);
    });
    builder.addCase(tabCreated, ({ byId }, action) => {
      const { tab } = action.payload;
      byId[tab.windowId].tabs.push(tab.id);
    });
    builder.addCase(tabRemoved, (state, action) => {
      const { windowId, tabId } = action.payload;
      const { tabs } = state.byId[windowId];
      deleteInPlace(tabId, tabs);
    });
    builder.addCase(tabAttached, ({ byId }, action) => {
      const { windowId, tabId, position } = action.payload;
      // check if the tab has already been attached in store by dnd
      if (byId[windowId].tabs[position] !== tabId) {
        insertTab(byId[windowId].tabs, position, tabId);
      }
    });
    builder.addCase(tabDetached, (state, action) => {
      const { windowId, tabId } = action.payload;
      const { tabs } = state.byId[windowId];
      deleteInPlace(tabId, tabs);
    });
    builder.addCase(tabDragEnded, ({ byId }, action) => {
      const {
        tabId,
        sourceWindowId,
        index,
        destinationWindowId,
      } = action.payload;
      if (sourceWindowId === destinationWindowId) {
        const { tabs } = byId[destinationWindowId];

        byId[destinationWindowId].tabs = move(tabs.indexOf(tabId), index, tabs);
      } else {
        const { tabs } = byId[sourceWindowId];
        deleteInPlace(tabId, tabs);
        insertTab(byId[destinationWindowId].tabs, index, tabId);
      }
    });
    builder.addCase(tabMoved, ({ byId }, action) => {
      const { tabId, index, windowId } = action.payload;

      const { tabs } = byId[windowId];

      byId[windowId].tabs = move(tabs.indexOf(tabId), index, tabs);
    });
  }
);

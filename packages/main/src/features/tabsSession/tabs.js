import { createSlice } from "@reduxjs/toolkit";
import partition from "ramda/src/partition";
import uniq from "ramda/src/uniq";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: (builder) => {
    builder.addCase("windows/addWindow", (state, action) => {
      const { tabs } = action.payload.data;
      tabs.forEach((tab) => {
        state.byId[tab.id] = { ...tab };
      });
      state.allIds = uniq([...state.allIds, ...tabs.map((t) => t.id)]);
    });
    builder.addCase("windows/removeWindow", (state, action) => {
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
  },
  reducers: {
    addTab: {
      reducer(state, action) {
        const { tab } = action.payload;
        state.byId[tab.id] = { ...tab };
        state.allIds.push(tab.id);
      },
      prepare(tab) {
        return {
          payload: {
            tab,
          },
        };
      },
    },
    removeTab: {
      reducer(state, action) {
        const { tab } = action.payload;
        delete state.byId[tab.id];
        state.allIds.splice(state.allIds.indexOf(tab.id), 1);
      },
      prepare(tab) {
        return {
          payload: {
            tab,
          },
        };
      },
    },
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

// todo: setup SAGA, create sagas,

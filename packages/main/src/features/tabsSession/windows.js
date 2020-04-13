import { createSlice } from "@reduxjs/toolkit";

import uniq from "ramda/src/uniq";

const windowsSlice = createSlice({
  name: "windows",
  initialState: {
    byId: {},
    allIds: [],
    activeWindow: null,
  },
  extraReducers: (builder) => {
    builder.addCase("tabs/addTab", (state, action) => {
      const { id, text } = action.payload;
      state.push({ id, text, completed: false });
    });
    builder.addCase("tabs/removeTab", (state, action) => {});
  },
  reducers: {
    addWindow: {
      reducer(state, action) {
        console.log("ddWindo", action.payload.data);
        const { id, data } = action.payload;
        state.byId[id] = { ...data, tabs: data.tabs.map((t) => t.id) };
        state.allIds = uniq([...state.allIds, id]);
      },
      prepare(window) {
        const { id } = window;
        return {
          payload: {
            id,
            data: window,
          },
        };
      },
    },
    removeWindow: (state, action) => {
      const { windowId } = action.payload;
      delete state.byId[windowId];
      state.allIds.delete(windowId);
    },
  },
});

export const { reducer, actions } = windowsSlice;

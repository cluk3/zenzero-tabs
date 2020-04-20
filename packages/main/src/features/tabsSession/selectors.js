import sort from "ramda/src/sort";
import { createSelector } from "@reduxjs/toolkit";

const activeWindowFirst = sort((window) => (window.focused ? -1 : 1));

export const windowsSelector = createSelector(
  (state) => state.windows,
  ({ allIds, byId }) => activeWindowFirst(allIds.map((id) => byId[id]))
);

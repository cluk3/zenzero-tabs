import React from "react";
import { WindowItem } from "components/WindowItem";
import sort from "ramda/src/sort";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const activeWindowFirst = sort((window) => (window.focused ? -1 : 1));

const getWindows = createSelector(
  (state) => state.windows,
  ({ allIds, byId }) => activeWindowFirst(allIds.map((id) => byId[id]))
);

export const TabsView = () => {
  const windows = useSelector(getWindows);
  return (
    <div>
      {windows.length ? (
        windows.map((window) => (
          <WindowItem
            key={window.id}
            isActive={window.focused}
            window={window}
          />
        ))
      ) : (
        <h2>Wait for it...</h2>
      )}
    </div>
  );
};

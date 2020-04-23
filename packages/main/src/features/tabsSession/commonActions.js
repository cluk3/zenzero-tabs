import { createAction } from "@reduxjs/toolkit";

export const tabCreated = createAction("tabCreated", (tab) => {
  return {
    payload: {
      tab,
    },
  };
});

export const tabRemoved = createAction("tabRemoved", (tabId, windowId) => {
  return {
    payload: {
      tabId,
      windowId,
    },
  };
});
export const tabMoved = createAction("tabMoved");

export const tabDragEnded = createAction("tabDragEnded");

export const tabAttached = createAction(
  "tabAttached",
  (tabId, windowId, position) => {
    return {
      payload: {
        windowId,
        tabId,
        position,
      },
    };
  }
);
export const tabDetached = createAction("tabDetached", (tabId, windowId) => {
  return {
    payload: {
      windowId,
      tabId,
    },
  };
});

export const windowCreated = createAction("windowCreated");
export const windowsRetrieved = createAction("windowsRetrieved", (windows) => ({
  payload: {
    windows,
  },
}));

export const windowRemoved = createAction("windowRemoved", (windowId) => ({
  payload: {
    windowId,
  },
}));

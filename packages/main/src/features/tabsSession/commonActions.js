import { createAction } from "@reduxjs/toolkit";

export const addTab = createAction("tabs/addTab", (tab) => {
  return {
    payload: {
      tab,
    },
  };
});

export const removeTab = createAction("tabs/removeTab", (tabId, windowId) => {
  return {
    payload: {
      tabId,
      windowId,
    },
  };
});
export const moveTab = createAction(
  "tabs/moveTab",
  (tabId, fromIndex, toIndex, windowId) => {
    return {
      payload: {
        tabId,
        fromIndex,
        toIndex,
        windowId,
      },
    };
  }
);
export const attachTab = createAction(
  "tabs/attachTab",
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
export const detachTab = createAction("tabs/detachTab", (tabId, windowId) => {
  return {
    payload: {
      windowId,
      tabId,
    },
  };
});

export const addWindow = createAction("windows/addWindow");
export const addWindows = createAction("windows/addWindows", (windows) => ({
  payload: {
    windows,
  },
}));

export const removeWindow = createAction(
  "windows/removeWindow",
  (windowId) => ({
    payload: {
      windowId,
    },
  })
);

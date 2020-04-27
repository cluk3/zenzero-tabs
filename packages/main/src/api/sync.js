import browser from "webextension-polyfill";
import { bindActionCreators } from "redux";
import {
  windowCreated,
  windowRemoved,
  tabCreated,
  tabRemoved,
  tabAttached,
  tabDetached,
  tabMoved,
  updateTab,
} from "features/tabsSession";

import {
  ON_REMOVED,
  ON_CREATED,
  ON_UPDATED,
  ON_MOVED,
  ON_DETACHED,
  ON_ATTACHED,
} from "./events";

const actions = {
  windowCreated,
  windowRemoved,
  tabCreated,
  tabRemoved,
  tabAttached,
  tabDetached,
  tabMoved,
  updateTab,
};

export const initSync = (dispatch) => {
  const {
    windowCreated,
    windowRemoved,
    tabCreated,
    tabRemoved,
    tabAttached,
    tabDetached,
    tabMoved,
    updateTab,
  } = bindActionCreators(actions, dispatch);

  const tabHandlers = {
    [ON_REMOVED]: (tabId, { isWindowClosing, windowId }) => {
      tabRemoved(tabId, windowId);
    },
    [ON_CREATED]: (tab) => {
      tabCreated(tab);
    },
    [ON_UPDATED]: (tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete") updateTab(tab);
    },
    [ON_MOVED]: (tabId, { fromIndex, toIndex, windowId }) => {
      tabMoved({
        tabId,
        index: toIndex,
        windowId,
      });
    },
    [ON_DETACHED]: (tabId, { oldPosition, oldWindowId }) => {
      tabDetached(tabId, oldWindowId);
    },
    [ON_ATTACHED]: (tabId, { newPosition, newWindowId }) => {
      tabAttached(tabId, newWindowId, newPosition);
    },
  };
  const windowsHandlers = {
    [ON_CREATED]: windowCreated,
    [ON_REMOVED]: windowRemoved,
  };

  Object.entries(tabHandlers).forEach(([event, handler]) =>
    browser.tabs[event].addListener(handler)
  );
  Object.entries(windowsHandlers).forEach(([event, handler]) =>
    browser.windows[event].addListener(handler)
  );

  // activeWindowId will be -1 if none is focused
  // not sure if it's going to be useful
  // browser.windows.onFocusChanged.addListener((activeWindowId) => {});

  return () => {
    Object.entries(tabHandlers).forEach(([event, handler]) =>
      browser.tabs[event].removeListener(handler)
    );
    Object.entries(windowsHandlers).forEach(([event, handler]) =>
      browser.windows[event].removeListener(handler)
    );
  };
};

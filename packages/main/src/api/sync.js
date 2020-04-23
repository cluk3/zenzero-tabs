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

  const handleRemovedTab = (tabId, { isWindowClosing, windowId }) => {
    tabRemoved(tabId, windowId);
  };
  const handleCreatedTab = (tab) => {
    tabCreated(tab);
  };
  const handleUpdatedTab = (tabId, changeInfo, tab) => {
    updateTab(tab);
  };
  const handleMovedTab = (tabId, { fromIndex, toIndex, windowId }) => {
    tabMoved({
      tabId,
      index: toIndex,
      windowId,
    });
  };
  const handleDetachedTab = (tabId, { oldPosition, oldWindowId }) => {
    tabDetached(tabId, oldWindowId);
  };
  const handleAttachedTab = (tabId, { newPosition, newWindowId }) => {
    tabAttached(tabId, newWindowId, newPosition);
  };

  const handleCreatedWindow = (window) => {
    windowCreated(window);
  };
  const handleRemovedWindow = (windowId) => {
    windowRemoved(windowId);
  };

  browser.tabs.onRemoved.addListener(handleRemovedTab);
  browser.tabs.onCreated.addListener(handleCreatedTab);
  browser.tabs.onUpdated.addListener(handleUpdatedTab);
  browser.tabs.onMoved.addListener(handleMovedTab);
  browser.tabs.onDetached.addListener(handleDetachedTab);
  browser.tabs.onAttached.addListener(handleAttachedTab);

  // here window obj has no `tabs` prop
  browser.windows.onCreated.addListener(handleCreatedWindow);
  browser.windows.onRemoved.addListener(handleRemovedWindow);
  // activeWindowId will be -1 if none is focused
  // not sure if it's going to be useful
  //   browser.windows.onFocusChanged.addListener((activeWindowId) => {});

  return () => {
    browser.tabs.onRemoved.removeListener(handleRemovedTab);
    browser.tabs.onCreated.removeListener(handleCreatedTab);
    browser.tabs.onUpdated.removeListener(handleUpdatedTab);
    browser.tabs.onMoved.removeListener(handleMovedTab);
    browser.tabs.onDetached.removeListener(handleDetachedTab);
    browser.tabs.onAttached.removeListener(handleAttachedTab);
    browser.windows.onCreated.removeListener(handleCreatedWindow);
    browser.windows.onRemoved.removeListener(handleRemovedWindow);
  };
};

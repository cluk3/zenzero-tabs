import browser from "webextension-polyfill";
import { bindActionCreators } from "redux";
import {
  addWindow,
  removeWindow,
  addTab,
  removeTab,
  attachTab,
  detachTab,
  moveTab,
  updateTab,
} from "features/tabsSession";

const actions = {
  addWindow,
  removeWindow,
  addTab,
  removeTab,
  attachTab,
  detachTab,
  moveTab,
  updateTab,
};
export const initSync = (dispatch) => {
  const {
    addWindow,
    removeWindow,
    addTab,
    removeTab,
    attachTab,
    detachTab,
    moveTab,
    updateTab,
  } = bindActionCreators(actions, dispatch);

  const handleRemovedTab = (tabId, { isWindowClosing, windowId }) => {
    removeTab(tabId, windowId);
  };
  const handleCreatedTab = (tab) => {
    addTab(tab);
  };
  const handleUpdatedTab = (tabId, changeInfo, tab) => {
    console.log("update", changeInfo, tab);
    updateTab(tab);
  };
  const handleMovedTab = (tabId, { fromIndex, toIndex, windowId }) => {
    moveTab(tabId, fromIndex, toIndex, windowId);
  };
  const handleDetachedTab = (tabId, { oldPosition, oldWindowId }) => {
    detachTab(tabId, oldWindowId);
  };
  const handleAttachedTab = (tabId, { newPosition, newWindowId }) => {
    attachTab(tabId, newWindowId, newPosition);
  };

  const handleCreatedWindow = (window) => {
    addWindow(window);
  };
  const handleRemovedWindow = (windowId) => {
    removeWindow(windowId);
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

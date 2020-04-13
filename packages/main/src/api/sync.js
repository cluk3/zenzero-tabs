import browser from "webextension-polyfill";

const initSync = (dispatch, actions) => {
  const handleRemovedTab = (tabId, { isWindowClosing, windowId }) => {
    dispatch(actions.removeTab);
  };
  const handleCreatedTab = (tab) => {};
  const handleUpdatedTab = (tabId, changeInfo, tab) => {};
  const handleMovedTab = (tabId, { fromIndex, toIndex, windowId }) => {};
  const handleDetachedTab = (tabId, { oldPosition, oldWindowId }) => {};
  const handleAttachedTab = (tabId, { newPosition, newWindowId }) => {};

  browser.tabs.onRemoved.addListener(handleRemovedTab);
  browser.tabs.onCreated.addListener(handleCreatedTab);
  browser.tabs.onUpdated.addListener(handleUpdatedTab);
  browser.tabs.onMoved.addListener(handleMovedTab);
  browser.tabs.onDetached.addListener(handleDetachedTab);
  browser.tabs.onAttached.addListener(handleAttachedTab);

  const handleCreatedWindow = (window) => {};
  const handleRemovedWindow = (windowId) => {};
  const handleCreatedWindow =
    // here window obj has no `tabs` prop
    browser.windows.onCreated.addListener(handleCreatedWindow);
  browser.windows.onRemoved.addListener();
  // activeWindowId will be -1 if none is focused
  // not sure if it's going to be useful
  //   browser.windows.onFocusChanged.addListener((activeWindowId) => {});
};

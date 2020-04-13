import browser from "webextension-polyfill";

export const closeTab = (tabId) => {
  return browser.tabs.remove(tabId);
};

export const focusTab = async ({ id: tabId, windowId }) => {
  await browser.tabs.update(tabId, { active: true });
  await browser.windows.update(windowId, { focused: true });
};

export const moveTab = (tab, window) =>
  browser.tabs.move(tab.id, { windowId: window.id, index: -1 });

export const closeWindow = () => {};
export const focusWindow = () => {};

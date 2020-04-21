import browser from "webextension-polyfill";
import { memoizedThrottle } from "utils";

export const closeTab = (tabId) => {
  return browser.tabs.remove(tabId);
};

export const focusTab = async ({ id: tabId, windowId }) => {
  await browser.tabs.update(tabId, { active: true });
  await browser.windows.update(windowId, { focused: true });
};

export const moveTab = memoizedThrottle(
  (tabId, windowId, index = -1) => {
    browser.tabs.move(tabId, { windowId, index });
  },
  500,
  { leading: true, trailing: false }
);

export const closeWindow = () => {};
export const focusWindow = () => {};

export const getWindows = () =>
  browser.windows.getAll({ populate: true, windowTypes: ["normal"] });

export const getFaviconUrl = (url, size = 32) =>
  `chrome://favicon/size/${size}/${url || ""}`;

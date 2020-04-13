import browser from "webextension-polyfill";

const updateBadge = tabsNumber => {
  browser.browserAction.setBadgeText({ text: "" + tabsNumber });
};

browser.runtime.onInstalled.addListener(() => {});

browser.tabs.onCreated.addListener(async () => {
  const tabs = await browser.tabs.query({});
  updateBadge(tabs.length);
});
browser.tabs.onRemoved.addListener(async () => {
  const tabs = await browser.tabs.query({});
  updateBadge(tabs.length);
});

(async () => {
  const tabs = await browser.tabs.query({});
  updateBadge(tabs.length);
})();

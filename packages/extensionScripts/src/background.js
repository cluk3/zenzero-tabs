import browser from "webextension-polyfill";

const updateBadge = async () => {
  const tabs = await browser.tabs.query({});
  browser.browserAction.setBadgeText({ text: `${tabs.length}` });
};

browser.runtime.onInstalled.addListener(() => {});

browser.tabs.onCreated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);

updateBadge();


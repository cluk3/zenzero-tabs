import browser from "webextension-polyfill";

const description =
    document.querySelector('meta[name="description"]') ||
    document.querySelector('meta[property="og:description"]') ||
    document.querySelector('meta[property="twitter:description"]');

if (description) {
  browser.runtime.sendMessage({
    description: description.content,
  });
}

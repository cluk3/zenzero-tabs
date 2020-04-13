import React, { useEffect } from "react";
import { Header } from "./layout/Header";
import { TabsView } from "./components/TabsView";
import { createGlobalStyle } from "styled-components";
import browser from "webextension-polyfill";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { addWindow } from "features/tabsSession";

const getWindows = () =>
  browser.windows.getAll({ populate: true, windowTypes: ["normal"] });

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  const dispatch = useDispatch();
  const updateState = (listener) => (...t) => {
    getWindows().then((windows) => {
      console.log(`From: ${listener}`, t, windows);
      windows.forEach((w) => dispatch(addWindow(w)));
    });
  };
  // useEffect(updateState, []);
  useEffect(() => {
    // TODO: more granular updates
    browser.tabs.onRemoved.addListener(updateState("tabs.onRemoved"));
    browser.tabs.onCreated.addListener(updateState("tabs.onCreated"));
    browser.tabs.onUpdated.addListener(updateState("tabs.onUpdated"));
    browser.tabs.onMoved.addListener(updateState("tabs.onMoved"));
    browser.tabs.onDetached.addListener(updateState("tabs.onDetached"));
    browser.tabs.onAttached.addListener(updateState("tabs.onAttached"));
    browser.windows.onCreated.addListener(updateState("windows.onCreated"));
    browser.windows.onRemoved.addListener(updateState("windows.onRemoved"));
    browser.windows.onFocusChanged.addListener(
      updateState("windows.onFocusChanged")
    );
    return () => {
      // TODO: uncomment when having a valid update state
      // browser.tabs.onRemoved.removeListener(updateState);
      // browser.tabs.onCreated.removeListener(updateState);
      // browser.tabs.onUpdated.removeListener(updateState);
      // browser.tabs.onMoved.removeListener(updateState);
      // browser.tabs.onDetached.removeListener(updateState);
      // browser.windows.onCreated.removeListener(updateState);
      // browser.windows.onRemoved.removeListener(updateState);
    };
  }, []);
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <h1>Aw yeah</h1>
      <DndProvider backend={Backend}>
        <div>
          <TabsView />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;

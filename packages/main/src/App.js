import React, { useEffect } from "react";
import { Header } from "./layout/Header";
import { TabsView } from "./components/TabsView";
import { GlobalStyle } from "./GlobalStyle";
import browser from "webextension-polyfill";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { initSync } from "api/sync";

import { addWindows } from "features/tabsSession";

const getWindows = () =>
  browser.windows.getAll({ populate: true, windowTypes: ["normal"] });

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getWindows().then((windows) => {
      dispatch(addWindows(windows));
    });
    return initSync(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <DndProvider backend={Backend}>
        <div>
          <TabsView />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;

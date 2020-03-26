import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { TabsView } from "./TabsView";
import { createGlobalStyle } from "styled-components";
import * as R from "ramda";

const groupByWindowId = R.groupBy(R.prop("windowId"));

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  const [tabs, setTabs] = useState();
  useEffect(() => {
    chrome.tabs.query({}, tabs => {
      const tabsByWindowId = groupByWindowId(tabs);
      console.log(tabsByWindowId);
      setTabs(tabsByWindowId);
    });
  }, [setTabs]);
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <div>
        {tabs ? <TabsView tabsByWindow={tabs} /> : <h2>Wait for it...</h2>}
      </div>
    </div>
  );
}

export default App;

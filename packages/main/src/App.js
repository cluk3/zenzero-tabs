import React, { useEffect } from "react";

import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import { Sidebar } from "./layout/Sidebar";
import { TabsView } from "./components/TabsView";
import { GlobalStyle } from "./GlobalStyle";
import { Flex } from "rebass/styled-components";

import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import { useDispatch, useSelector } from "react-redux";
import { addWindows } from "features/tabsSession";
import { initSync } from "api/sync";
import { getWindows } from "api/browser";
import { SidebarView } from "components/SidebarView";

function App() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.sidebar.isOpen);

  useEffect(() => {
    getWindows().then((windows) => {
      dispatch(addWindows(windows));
    });
    return initSync(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <GlobalStyle />
      <Header isSidebarOpen={isSidebarOpen} />
      {/* <Button variant='active' /> */}
      <DndProvider backend={Backend}>
        <Sidebar isSidebarOpen={isSidebarOpen}>
          <Flex p={1}>
            <SidebarView />
          </Flex>
        </Sidebar>
        <Main isSidebarOpen={isSidebarOpen}>
          <TabsView />
        </Main>
      </DndProvider>
    </div>
  );
}

export default App;

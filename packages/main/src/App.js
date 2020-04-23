import React, { useEffect, useCallback } from "react";

import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import { Sidebar } from "./layout/Sidebar";
import { TabsView } from "./components/TabsView";
import { GlobalStyle } from "./GlobalStyle";
import { Flex } from "rebass/styled-components";

import { DragDropContext } from "react-beautiful-dnd";

import { useDispatch, useSelector } from "react-redux";
import { windowsRetrieved, tabDragEnded } from "features/tabsSession";
import { initSync } from "api/sync";
import { getWindows, moveTab as moveBrowserTab } from "api/browser";
import { SidebarView } from "components/SidebarView";

import { extractNumericId } from "utils";

function App() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.sidebar.isOpen);

  useEffect(() => {
    getWindows().then((windows) => {
      dispatch(windowsRetrieved(windows));
    });
    return initSync(dispatch);
  }, [dispatch]);

  const handleDragEnd = useCallback(
    ({ draggableId, destination, source }) => {
      if (!destination) return;

      const { droppableId, index } = destination;
      const destinationWindowId = extractNumericId(droppableId);
      const sourceWindowId = extractNumericId(source.droppableId);

      if (sourceWindowId === destinationWindowId && index === source.index) {
        return;
      }
      const tabId = extractNumericId(draggableId);
      dispatch(
        tabDragEnded({ tabId, sourceWindowId, index, destinationWindowId })
      );
      moveBrowserTab(tabId, destinationWindowId, index);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <GlobalStyle />
      <Header isSidebarOpen={isSidebarOpen} />
      {/* <Button variant='active' /> */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Sidebar isSidebarOpen={isSidebarOpen}>
          <Flex p={1}>
            <SidebarView />
          </Flex>
        </Sidebar>
        <Main isSidebarOpen={isSidebarOpen}>
          <TabsView />
        </Main>
      </DragDropContext>
    </div>
  );
}

export default App;

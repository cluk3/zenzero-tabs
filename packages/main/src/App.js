import { getWindows, moveTab as moveBrowserTab } from "api/browser";
import { initSync } from "api/sync";
import { SidebarView } from "components/SidebarView";
import { tabDragEnded, windowsRetrieved } from "features/tabsSession";
import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "rebass/styled-components";
import { extractNumericId } from "utils";
import { TabsView } from "./components/TabsView";
import { GlobalStyle } from "./GlobalStyle";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import { Sidebar } from "./layout/Sidebar";
import { SaveBookmarkModal } from "components/SaveBookmarkModal";

function App() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.sidebar.isOpen);
  const bookmarkModalTabId = useSelector(
    (state) => state.ui.addBookmarkModal.tabId
  );
  const [hasPressedTab, setHasPressedTab] = useState(false);

  useEffect(() => {
    const handleTabPress = function (e) {
      if (e.which === 9) {
        /* tab */
        setHasPressedTab(true);
        document.body.removeEventListener("keyup", handleTabPress);
      }
    };
    document.body.addEventListener("keyup", handleTabPress);
    return () => {
      document.body.removeEventListener("keyup", handleTabPress);
    };
  }, []);
  useEffect(() => {
    getWindows().then((windows) => {
      dispatch(windowsRetrieved(windows));
    });
    dispatch({ type: "APP_INIT" });
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
      <GlobalStyle hasPressedTab={hasPressedTab} />
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
      <SaveBookmarkModal key={bookmarkModalTabId} />
    </div>
  );
}

export default App;

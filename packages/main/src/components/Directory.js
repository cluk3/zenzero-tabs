import React, { memo } from "react";
import { Tree } from "components/Tree";
import { Flex, Image, Text } from "rebass/styled-components";
import { windowsSelector } from "features/tabsSession";
import { useSelector } from "react-redux";
import { TabsList } from "components/TabsList";
import { withTabDragAndDrop } from "hocs/withTabDragAndDrop";
import { getFaviconUrl } from "api/browser";
import { Droppable } from "react-beautiful-dnd";

export const Directory = memo(() => {
  const windows = useSelector(windowsSelector);

  return (
    <>
      {windows.map((w, i) => {
        return (
          <Droppable key={w.id} droppableId={"window-side-" + w.id} type="TAB">
            {(provided) => {
              return (
                <Tree
                  key={w.id}
                  name={i === 0 ? "Current Window" : "Window " + i}
                  defaultOpen
                >
                  <TabsList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    tabIds={w.tabs}
                  >
                    {({ tabs }) => {
                      return (
                        <>
                          {tabs.map((tab, i) => (
                            <DraggableTabEntry
                              key={"side" + tab.id}
                              index={i}
                              tab={tab}
                            />
                          ))}
                          {provided.placeholder}
                        </>
                      );
                    }}
                  </TabsList>
                </Tree>
              );
            }}
          </Droppable>
        );
      })}
    </>
  );
});

export const TabEntry = memo(({ tab, isDragging }) => {
  return (
    <Flex alignItems="start" my={2} ml={3} sx={{ opacity: isDragging ? 1 : 1 }}>
      <Image
        sx={{
          flex: "0 0 16px",
        }}
        width="16px"
        height="16px"
        src={getFaviconUrl(tab.url, 16)}
      ></Image>
      <Flex ml={2} flexDirection="column" justifyContent="center">
        <Text
          mt="-2px"
          mb="6px"
          sx={{
            flex: "1 0",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tab.title}
        </Text>
        <Text
          sx={{
            flex: "1 0",
            color: "contrast",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tab.url}
        </Text>
      </Flex>
    </Flex>
  );
});

const DraggableTabEntry = withTabDragAndDrop(TabEntry, "side");

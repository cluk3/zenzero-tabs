import React, { memo } from "react";
import { Tree } from "components/Tree";
import { Flex, Image, Text } from "rebass/styled-components";
import { windowsSelector } from "features/tabsSession";
import { useSelector } from "react-redux";
import { TabsList } from "components/TabsList";
import { withTabDragAndDrop } from "hocs/withTabDragAndDrop";
import { getFaviconUrl } from "api/browser";

export const Directory = memo(() => {
  const windows = useSelector(windowsSelector);

  return (
    <>
      {windows.map((w, i) => {
        return (
          <Tree
            key={w.id}
            name={i === 0 ? "Current Window" : "Window " + i}
            defaultOpen
          >
            <TabsList tabIds={w.tabs}>
              {({ tabs }) => {
                return tabs.map((tab, i) => (
                  <DraggableTabEntry
                    key={"side" + tab.id}
                    index={i}
                    tab={tab}
                  />
                ));
              }}
            </TabsList>
          </Tree>
        );
      })}
    </>
  );
});

const TabEntry = memo(({ tab, isDragging, isOver }) => {
  return (
    <Flex
      alignItems="start"
      my={2}
      ml={3}
      sx={{ opacity: isDragging ? 0.1 : 1 }}
    >
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
            overflowX: "hidden",
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
            overflowX: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tab.url}
        </Text>
      </Flex>
    </Flex>
  );
});

const DraggableTabEntry = withTabDragAndDrop(TabEntry);

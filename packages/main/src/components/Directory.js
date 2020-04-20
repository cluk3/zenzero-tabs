import React, { memo } from "react";
import { Tree } from "components/Tree";
import { Box, Flex, Image, Text } from "rebass/styled-components";
import { windowsSelector } from "features/tabsSession";
import { useSelector } from "react-redux";
import { TabsList } from "components/TabsList";
import { withTabDragAndDrop } from "hocs/withTabDragAndDrop";

import { useScroll } from "hooks";
import { transform, motion } from "framer-motion";

export const Directory = () => {
  const windows = useSelector(windowsSelector);

  const [scrollRef, { yPerc }] = useScroll();
  const width = transform(yPerc, [0, 1], ["0%", "100%"]);

  return (
    <Box ref={scrollRef} sx={{ overflowY: "scroll", height: "90vh" }}>
      <motion.div
        animate={{ width }}
        style={{
          backgroundColor: "red",
          height: "2px",
          position: "absolute",
        }}
      />
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
    </Box>
  );
};

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
        src={tab.favIconUrl}
      ></Image>
      <Flex ml={2} flexDirection="column" justifyContent="center">
        <Text
          mt="-2px"
          mb="6px"
          sx={{
            flex: "1 0",
            fontWeight: "bold",
          }}
        >
          {tab.title}
        </Text>
        <Text
          sx={{
            flex: "1 0",
            color: "contrast",
          }}
        >
          {tab.url}
        </Text>
      </Flex>
    </Flex>
  );
});

const DraggableTabEntry = withTabDragAndDrop(TabEntry);

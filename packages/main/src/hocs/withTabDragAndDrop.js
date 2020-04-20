import React, { memo } from "react";
import { useDrag, useDrop, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "constants/dnd";
import { moveTab } from "api/browser";
import { Box } from "rebass/styled-components";
import { motion } from "framer-motion";
const spring = {
  type: "spring",
  damping: 22,
  stiffness: 200,
};

export const withTabDragAndDrop = (
  TabComponent,
  DropInsertionComponent = DropInsertionBox
) =>
  memo(({ tab, ...props }) => {
    const [, dragRef, preview] = useDrag({
      item: {
        type: ItemTypes.TAB,
        tabId: tab.id,
        index: props.index,
        windowId: tab.windowId,
      },
    });
    const [{ draggedTab, isOver }, drop] = useDrop({
      accept: ItemTypes.TAB,
      drop({ tabId }) {
        if (tabId !== tab.id) {
          moveTab(tabId, tab.windowId, props.index);
        }
      },
      collect(monitor) {
        const draggedTab = monitor.getItem() || {};
        return {
          draggedTab,
          isOver: draggedTab.tabId !== tab.id && monitor.isOver(),
        };
      },
    });
    return (
      <Box ref={(r) => dragRef(drop(r))}>
        <DragPreviewImage src={tab.favIconUrl} connect={preview} />
        {isOver &&
        (props.index < draggedTab.index ||
          tab.windowId !== draggedTab.windowId) ? (
          <DropInsertionComponent />
        ) : null}
        <motion.div positionTransition={spring}>
          <TabComponent
            isDragging={tab.id === draggedTab.tabId}
            tab={tab}
            isOver={isOver}
            {...props}
          />
        </motion.div>
        {isOver &&
        tab.windowId === draggedTab.windowId &&
        props.index > draggedTab.index ? (
          <DropInsertionComponent />
        ) : null}
      </Box>
    );
  });

const DropInsertionBox = () => (
  <Box m={2} sx={{ height: "2px", width: "100%", backgroundColor: "violet" }} />
);

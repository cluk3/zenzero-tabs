import React, { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "constants/dnd";
import { moveTab } from "api/browser";
import { Box } from "rebass/styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { startDrag, endDrag } from "features/tabsSession";

const spring = {
  type: "spring",
  damping: 22,
  stiffness: 200,
};

export const withTabDragAndDrop = (TabComponent) =>
  memo(({ tab, ...props }) => {
    const dispatch = useDispatch();
    const draggedTab = useSelector((state) => state.drag);
    const ref = useRef();
    const [, dragRef] = useDrag({
      item: {
        type: ItemTypes.TAB,
        tabId: tab.id,
        index: props.index,
        windowId: tab.windowId,
      },
      begin() {
        dispatch(
          startDrag({
            tabId: tab.id,
            index: props.index,
            windowId: tab.windowId,
          })
        );
      },
      end(tab, monitor) {
        dispatch(endDrag());
        if (!monitor.didDrop()) {
          moveTab(tab.tabId, tab.windowId, tab.index);
        }
      },
    });
    const [, drop] = useDrop({
      accept: ItemTypes.TAB,

      hover: (...args) => {
        if (draggedTab.tabId !== tab.id) {
          moveTab(draggedTab.tabId, tab.windowId, props.index);
        }
      },
    });
    dragRef(ref);
    drop(ref);
    return (
      <Box ref={ref}>
        <motion.div positionTransition={spring}>
          <TabComponent
            isDragging={tab.id === draggedTab.tabId}
            tab={tab}
            {...props}
          />
        </motion.div>
      </Box>
    );
  });

import React from "react";
import { Flex, Heading, Box } from "rebass/styled-components";
import { TabsList } from "components/TabsList";
import { useDrop } from "react-dnd";
import { ItemTypes } from "constants/dnd";
import { moveTab } from "api/browser";
import { TabCard } from "components/TabCard";
import { withTabDragAndDrop } from "hocs/withTabDragAndDrop";
import { useTransition, animated } from "react-spring";

const DraggableTabCard = withTabDragAndDrop(TabCard);

export const WindowItem = ({ isActive, window }) => {
  // const [, dropRef] = useDrop({
  //   accept: ItemTypes.TAB,
  //   hover: ({ tabId }, monitor) => {
  //     if (monitor.isOver({ shallow: true })) {
  //       // moveTab(tabId, window.id);
  //     }
  //   },
  // });
  return (
    <Flex flexDirection="column" mr={3} sx={{ width: "300px" }}>
      <Heading variant="listTitle">
        {isActive ? "Current Window" : "Windows"}
      </Heading>

      <Box>
        <TabsList tabIds={window.tabs}>
          {({ tabs }) => {
            // return <AnimatedTabList tabs={tabs} />;
            return tabs.map((tab, i) => (
              <DraggableTabCard key={"main" + tab.id} tab={tab} index={i} />
            ));
          }}
        </TabsList>
      </Box>
    </Flex>
  );
};

const AnimatedTabList = ({ tabs }) => {
  const transitions = useTransition(tabs, (item) => item.id, {
    from: { transform: "translate3d(-40px,0,0)" },
    enter: { transform: "translate3d(0px,0,0)" },
    leave: { transform: "translate3d(-40px,0,0)" },
  });

  return transitions.map(({ item, props, key }, i) => (
    <animated.div key={key} style={props}>
      <DraggableTabCard tab={item} index={i} />
    </animated.div>
  ));
};

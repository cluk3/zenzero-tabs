import React from "react";
import { Flex, Heading } from "rebass/styled-components";
import { TabsList } from "components/TabsList";
import { Droppable } from "react-beautiful-dnd";
import { TabCard } from "components/TabCard";
import { withTabDragAndDrop } from "hocs/withTabDragAndDrop";
import { useTransition, animated } from "react-spring";

const DraggableTabCard = withTabDragAndDrop(TabCard, "main");

export const WindowItem = ({ isActive, window }) => {
  return (
    <Flex flexDirection="column" mr={3} sx={{ width: "300px" }}>
      <Heading variant="listTitle">
        {isActive ? "Current Window" : "Windows"}
      </Heading>

      <Droppable droppableId={"window-" + window.id} type="TAB">
        {(provided) => {
          return (
            <TabsList
              ref={provided.innerRef}
              {...provided.droppableProps}
              tabIds={window.tabs}
            >
              {({ tabs }) => {
                return (
                  <>
                    {tabs.map((tab, i) => (
                      <DraggableTabCard
                        key={"main" + tab.id}
                        tab={tab}
                        index={i}
                      />
                    ))}
                    {provided.placeholder}
                  </>
                );
              }}
            </TabsList>
          );
        }}
      </Droppable>
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

import React from "react";
import { Flex, Heading, Box } from "rebass/styled-components";
import { TabsList } from "components/TabsList";
import { Droppable } from "react-beautiful-dnd";
import { TabCard } from "components/TabCard";
import { withTabDragAndDrop } from "hocs/withTabDragAndDrop";

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

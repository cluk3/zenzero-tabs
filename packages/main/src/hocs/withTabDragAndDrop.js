import React from "react";
import ReactDOM from "react-dom";
import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "./NaturalDragAnimation";
import { renderInPortal } from "portal";

export const withTabDragAndDrop = (TabComponent, id) => {
  return ({ tab, ...props }) => (
    <Draggable
      draggableId={`tab-${id}-${tab.id}`}
      index={props.index}
      type="TAB"
    >
      {(provided, snapshot) => {
        const child = (
          <NaturalDragAnimation
            style={provided.draggableProps.style}
            snapshot={snapshot}
          >
            {(style) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={style}
              >
                <TabComponent
                  tab={tab}
                  {...props}
                  isDragging={snapshot.isDragging}
                />
              </div>
            )}
          </NaturalDragAnimation>
        );

        return snapshot.isDragging ? renderInPortal(child) : child;
      }}
    </Draggable>
  );
};

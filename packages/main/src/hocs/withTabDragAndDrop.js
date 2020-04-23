import React, { memo, useRef } from "react";
import ReactDOM from "react-dom";
import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "./NaturalDragAnimation";

function initPortal() {
  const portal = document.createElement("div");
  portal.classList.add("dnd-portal");

  document.body.appendChild(portal);
  return portal;
}
let portal;

export const withTabDragAndDrop = (TabComponent, id) => {
  if (!portal) {
    portal = initPortal();
  }
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

        return snapshot.isDragging
          ? ReactDOM.createPortal(child, portal)
          : child;
      }}
    </Draggable>
  );
};

import styled from "styled-components";
import React from "react";
import { Button, Card } from "rebass/styled-components";

export const TabItem = ({ isDragging, ...props }) => (
  <Card
    sx={{
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "3rem auto",
      boxShadow: "card",
      borderRadius: "3px",
      height: "6rem",
      cursor: "pointer",
      position: "relative",
      opacity: isDragging ? 0 : 1,
      backgroundColor: "primary",
      color: "text",
      transition: "transform, opacity 0.2s ease-out",
      mb: 2,
      contain: "content",
      willChange: "transform",
      transform: isDragging ? "translateX(-40px)" : "translateX(0)",

      ":hover": {
        boxShadow: "cardHover",
        transform: "translate3d(1px, 1px, 0)",
      },
    }}
    {...props}
  />
);

export const CloseButton = (props) => (
  <Button
    sx={{
      position: "absolute",
      top: "1rem",
      right: "1rem",
      height: "1rem",
      width: "1rem",
      backgroundColor: "background",
      color: "text",
      borderRadius: "50%",
    }}
    {...props}
  ></Button>
);

export const TabFavIcon = styled.img`
  width: 2rem;
  height: 2rem;
  place-self: start center;
  margin-top: 0.5rem;
`;

export const TabTitle = styled.div`
  font-size: 0.875rem;
  padding: 0 8px;
  margin: 0;
  height: 3.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-break: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  place-self: center start;
  line-height: 1.2rem;
`;

import styled from "styled-components";

export const TabFavIcon = styled.img`
  width: 2rem;
  height: 2rem;
  place-self: center center;
  /* grid-row-start: 2; */
`;

export const TabTitle = styled.div`
  font-size: 0.875rem;
  max-height: 3.6rem;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  place-self: center start;
  line-height: 1.2rem;
  /* grid-column-start: 1;
  grid-column-end: 3; */
  padding: 0 8px;
`;

import styled from "styled-components";

export const TabItem = styled.div`
  display: grid;
  grid-template-columns: 3rem auto;
  box-shadow: 1px 1px 0px 0px rgba(94, 93, 102, 0.08),
    2px 2px 3px 0px rgba(94, 93, 102, 0.1);
  height: 4rem;
  cursor: pointer;
  position: relative;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 1rem;
  width: 1rem;
  background-color: red;
  border-radius: 50%;
`;

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

import styled from "styled-components";

export const TabItem = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 3rem auto;
  box-shadow: ${({ theme }) => theme.shadows.neonBlue};
  border-radius: 3px;
  height: 4rem;
  cursor: pointer;
  position: relative;
  background-color: ${({ theme, isDragging }) =>
    !isDragging ? theme.colors.primary : "pink"};
  color: hsl(230, 93%, 98%);

  :hover {
    box-shadow: ${({ theme }) => theme.shadows.neonBlueHover};
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 1rem;
  width: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
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

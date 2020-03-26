import React from "react";
import styled from "styled-components";

const ListContainer = styled.ul`
  list-style-type: none;
`;

const TabItem = styled.li`
  display: grid;
  grid-template-columns: 3rem auto;
  border: 2px black solid;
`;

const TabFavIcon = styled.img`
  width: 2rem;
  height: 2rem;
  justify-self: center;
  align-self: center;
`;

const TabTitle = styled.span`
  font-size: 1rem;
  padding: 1rem;
`;

export const TabsList = ({ tabs }) => {
  return (
    <ListContainer>
      {tabs.map(tab => (
        <TabItem key={tab.id}>
          <TabFavIcon
            src={
              tab.favIconUrl
                ? tab.favIconUrl
                : "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
            }
            alt="tab favicon"
          />
          <TabTitle>{tab.title}</TabTitle>
        </TabItem>
      ))}
    </ListContainer>
  );
};

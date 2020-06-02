import styled from "styled-components";
import { TabFavicon } from "components/TabFavicon";

export const TabFavIcon = styled(TabFavicon)`
  place-self: center center;
`;

export const TabTitle = styled.div`
  font-size: 0.875rem;
  max-height: 3.6rem;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  -webkit-line-clamp: 3;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
  place-self: center start;
  line-height: 1.2rem;
  /* grid-column-start: 1;
  grid-column-end: 3; */
  padding: 0 8px;
`;

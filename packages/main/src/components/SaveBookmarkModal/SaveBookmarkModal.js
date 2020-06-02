import React from "react";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import styled from "styled-components";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const getModalData = createSelector(
  ({ tabs, ui }) => tabs.byId[ui.addBookmarkModal.tabId],
  ({ ui }) => ui.addBookmarkModal.isOpen,
  (tab, isOpen) => [tab, isOpen]
);

export const SaveBookmarkModal = () => {
  const [tab, isOpen] = useSelector(getModalData);
  return (
    <StyledModal
      open={isOpen}
      aria-labelledby="add-bookmark"
      aria-describedby="add tab to bookmarks"
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <Paper elevation={2}>
          <h2>Save Bookmark</h2>
        </Paper>
      </Fade>
    </StyledModal>
  );
};

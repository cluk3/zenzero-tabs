import React, { useCallback, useState, useMemo } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import { TabFavicon } from "components/TabFavicon";
import { closeAddBookmarkModal } from "features/ui";
import { saveBookmarkClicked } from "features/bookmarks";
import Switch from "@material-ui/core/Switch";

const getModalData = createSelector(
  ({ tabs, ui }) => tabs.byId[ui.addBookmarkModal.tabId],
  ({ ui }) => ui.addBookmarkModal.isOpen,
  ({ categories }) => categories.allIds,
  (tab, isOpen, categories) => [tab, isOpen, categories]
);

export const SaveBookmarkModal = () => {
  const [tab, isOpen, categories] = useSelector(getModalData);
  const dispatch = useDispatch();
  const [addedTags, setAddedTags] = useState([]);
  const [closeTabAfterSave, setCloseTabAfterSave] = useState(false);
  const [tag, setTag] = useState("");
  const handleClose = useCallback(() => {
    dispatch(closeAddBookmarkModal());
  }, [dispatch]);
  const handleTagDelete = useCallback(
    (addedTag) => () =>
      setAddedTags((addedTags) => addedTags.filter((t) => t !== addedTag)),
    [setAddedTags]
  );
  const handleChange = useCallback((e) => setTag(e.target.value), [setTag]);
  const handleTagClick = useCallback(
    (tag) => () =>
      setAddedTags((addedTags) => [...new Set(addedTags.concat(tag))]),
    [setAddedTags]
  );
  const handleEnterPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setAddedTags((addedTags) => [...new Set(addedTags.concat(tag))]);
        setTag("");
      }
    },
    [setTag, setAddedTags, tag]
  );
  const handleSaveClick = useCallback(
    (e) => {
      dispatch(
        saveBookmarkClicked({
          categories: addedTags,
          bookmark: {
            url: tab.url,
            title: tab.title,
          },
          shouldCloseTab: closeTabAfterSave,
          tabId: tab.id,
        })
      );
      handleClose();
    },
    [handleClose, tab, addedTags, dispatch, closeTabAfterSave]
  );
  const toggleChecked = useCallback(() => setCloseTabAfterSave((x) => !x), [
    setCloseTabAfterSave,
  ]);

  const otherTags = useMemo(
    () => categories.filter((tag) => !addedTags.includes(tag)),
    [categories, addedTags]
  );
  return (
    <Dialog
      maxWidth="lg"
      open={isOpen}
      aria-labelledby="dialog-title"
      onClose={handleClose}
    >
      {tab && (
        <>
          <DialogTitle id="dialog-title">Save Bookmark</DialogTitle>
          <DialogContent>
            <TabFavicon url={tab.url} size={2} />
            <DialogContentText>{tab.title}</DialogContentText>
            <DialogContentText>{tab.url}</DialogContentText>
            <TextField
              id="add-tag"
              fullWidth
              autoFocus
              label="Add Tag"
              variant="outlined"
              value={tag}
              onChange={handleChange}
              onKeyPress={handleEnterPress}
            />
            {addedTags.map((addedTag) => (
              <Chip
                key={addedTag}
                label={addedTag}
                onDelete={handleTagDelete(addedTag)}
              />
            ))}
            <DialogContentText>Other Tags</DialogContentText>
            {otherTags.map((tag) => (
              <Chip
                key={tag}
                icon={<AddIcon />}
                label={tag}
                variant="outlined"
                onClick={handleTagClick(tag)}
              />
            ))}
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                disabled={addedTags.length === 0}
                onClick={handleSaveClick}
                color="primary"
              >
                Save
              </Button>
              <Switch checked={closeTabAfterSave} onChange={toggleChecked} />
            </DialogActions>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

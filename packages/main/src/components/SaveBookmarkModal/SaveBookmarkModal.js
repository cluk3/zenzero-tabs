import React, { useCallback, useState, useMemo } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import { TabFavicon } from "components/TabFavicon";
import { closeAddBookmarkModal } from "features/ui";
import { saveBookmarkClicked, deleteBookmarkClicked } from "features/bookmarks";
import Switch from "@material-ui/core/Switch";
import { difference } from "ramda";

const getModalData = createSelector(
  ({ tabs }) => tabs.byId,
  ({ bookmarks }) => bookmarks.byId,
  ({ ui }) => ui.addBookmarkModal,
  ({ categories }) => categories.allIds,
  (tabs, bookmarks, { isOpen, tabId }, categories) => {
    const tab = tabs[tabId];
    return {
      tab,
      isOpen,
      categories,
      bookmark: tab && bookmarks[tab.url],
    };
  }
);

export const SaveBookmarkModal = () => {
  const { tab, isOpen, categories, bookmark } = useSelector(getModalData);
  const dispatch = useDispatch();
  const isEdit = !!bookmark;
  const bookmarkCategories = (isEdit && bookmark.categories) || [];
  const [addedCategories, setAddedCategories] = useState(bookmarkCategories);
  const [closeTabAfterSave, setCloseTabAfterSave] = useState(false);
  const [category, setCategory] = useState("");
  const handleClose = useCallback(() => {
    dispatch(closeAddBookmarkModal());
  }, [dispatch]);
  const handleCategoryDelete = useCallback(
    (addedCategory) => () =>
      setAddedCategories((addedCategories) =>
        addedCategories.filter((t) => t !== addedCategory)
      ),
    [setAddedCategories]
  );
  const handleChange = useCallback((e) => setCategory(e.target.value), [
    setCategory,
  ]);
  const handleCategoryClick = useCallback(
    (category) => () =>
      setAddedCategories((addedCategories) => [
        ...new Set(addedCategories.concat(category)),
      ]),
    [setAddedCategories]
  );
  const handleEnterPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setAddedCategories((addedCategories) => [
          ...new Set(addedCategories.concat(category)),
        ]);
        setCategory("");
      }
    },
    [setCategory, setAddedCategories, category]
  );
  const handleSaveClick = useCallback(
    (e) => {
      dispatch(
        saveBookmarkClicked({
          categories: isEdit
            ? {
                toAdd: difference(addedCategories, bookmarkCategories),
                toRemove: difference(bookmarkCategories, addedCategories),
              }
            : addedCategories,
          bookmark: {
            url: tab.url,
            title: tab.title,
          },
          shouldCloseTab: closeTabAfterSave,
          tabId: tab.id,
          isEdit,
        })
      );
      handleClose();
    },
    [
      handleClose,
      tab,
      addedCategories,
      dispatch,
      closeTabAfterSave,
      bookmarkCategories,
      isEdit,
    ]
  );
  const toggleChecked = useCallback(() => setCloseTabAfterSave((x) => !x), [
    setCloseTabAfterSave,
  ]);
  const handleDeleteClick = useCallback(() => {
    dispatch(
      deleteBookmarkClicked({
        bookmark,
        shouldCloseTab: closeTabAfterSave,
        tabId: tab.id,
        categories: bookmarkCategories,
      })
    );
    handleClose();
  }, [
    handleClose,
    tab,
    bookmark,
    bookmarkCategories,
    dispatch,
    closeTabAfterSave,
  ]);

  const otherCategories = useMemo(
    () => categories.filter((category) => !addedCategories.includes(category)),
    [categories, addedCategories]
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
          <DialogTitle id="dialog-title">
            {bookmark ? "Edit Bookmark" : "Save Bookmark"}
          </DialogTitle>
          <DialogContent>
            <TabFavicon url={tab.url} size={2} />
            <DialogContentText>{tab.title}</DialogContentText>
            <DialogContentText>{tab.url}</DialogContentText>
            <TextField
              id="add-category"
              fullWidth
              autoFocus
              label="Add Category"
              variant="outlined"
              value={category}
              onChange={handleChange}
              onKeyPress={handleEnterPress}
            />
            {addedCategories.map((addedCategory) => (
              <Chip
                key={addedCategory}
                label={addedCategory}
                onDelete={handleCategoryDelete(addedCategory)}
              />
            ))}
            <DialogContentText>Other Categories</DialogContentText>
            {otherCategories.map((category) => (
              <Chip
                key={category}
                icon={<AddIcon />}
                label={category}
                variant="outlined"
                onClick={handleCategoryClick(category)}
              />
            ))}
            <DialogActions>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={closeTabAfterSave}
                    onChange={toggleChecked}
                  />
                }
                label="Close tab on save:"
                labelPlacement="start"
              />
              <Button onClick={handleClose} variant="outlined">
                Exit
              </Button>
              {bookmark && (
                <Button
                  onClick={handleDeleteClick}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              )}
              <Button
                disabled={addedCategories.length === 0}
                onClick={handleSaveClick}
                variant="outlined"
              >
                Save
              </Button>
            </DialogActions>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { closeSnackbar } from "features/ui";
import Slide from "@material-ui/core/Slide";

export const NotificationSnackbar = () => {
  const {
    isOpen,
    message,
    actionButtonCopy,
    action,
    timeout = 3000,
  } = useSelector(({ ui }) => ui.snackbar);
  const dispatch = useDispatch();
  const handleClose = useCallback(
    (e, reason) => {
      dispatch(closeSnackbar());
    },
    [dispatch]
  );
  const handleActionClick = useCallback(() => {
    dispatch(action);
  }, [dispatch, action]);

  function SlideTransition(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <Snackbar
      key={message}
      open={isOpen}
      autoHideDuration={timeout}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      TransitionComponent={SlideTransition}
    >
      <SnackbarContent
        message={message}
        action={
          action && (
            <Button onClick={handleActionClick} color="secondary" size="small">
              {actionButtonCopy}
            </Button>
          )
        }
      />
    </Snackbar>
  );
};

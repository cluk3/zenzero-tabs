import {
  reducer as windowsReducer,
  actions as windowsActions,
} from "./windows";
import { reducer as tabsReducer, actions as tabsActions } from "./tabs";

export { tabsReducer, windowsReducer };
export const { addTab, removeTab, updateTab } = tabsActions;
export const { addWindow, removeWindow } = windowsActions;

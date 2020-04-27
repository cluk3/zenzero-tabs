import ReactDOM from "react-dom";
const portalNode = document.getElementById("react-portal");
export const renderInPortal = (child) =>
  ReactDOM.createPortal(child, portalNode);

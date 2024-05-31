import React from "react";
import successIcon from "../assets/images/icon-success-check.svg";
import CloseIcon from "@mui/icons-material/Close";
import "../css/toast.css"

function Toast(props) {
  return (
    <div className="toast-container">
      <div className="toast-inner-container">
        <img
          src={successIcon}
          className="success-icon"
          alt="success-icon-check"
        />

        <h2>Message Sent!</h2>
      </div>
      <p>Thanks for completing the form. We'll be in touch soon!</p>
      <CloseIcon
        className="close-icon"
        fontSize="large"
        onClick={() => props.onClose()}
      />
    </div>
  );
}
export default Toast;

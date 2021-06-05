import React from "react";
import styles from "../styles/FormTemplateBody.module.css";

const ErrorBanner = (props) => {
  return (
    <div
      className={styles.error}
      style={{ display: props.failed == true ? "block" : "none" }}>
      <span>
        <small>{props.failed ? props.message : ""}</small>
      </span>
    </div>
  );
};

export default ErrorBanner;

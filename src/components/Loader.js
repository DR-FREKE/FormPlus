import React from "react";
import styles from "../styles/FormTemplateBody.module.css";

const Loader = (props) => (
  <div
    style={{ display: props.loading == true ? "flex" : "none" }}
    className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader;

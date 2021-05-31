import React from "react";
import styles from "../styles/Template.module.css";

const TemplateBox = (props) => (
  <div className={styles.box}>
    <div className={styles.topBox}>
      <div className={styles.topHeader}>
        <span>{props.template_name}</span>
      </div>
      <div className={styles.description}>
        <span>{props.description}</span>
        <div className={styles.category}>
          <span>Categories {JSON.stringify(props.categories)}</span>
        </div>
      </div>
    </div>
    <div className={styles.footerBox}>
      <span>use template</span>
    </div>
  </div>
);

export default TemplateBox;

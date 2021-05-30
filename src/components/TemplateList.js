import React from "react";
import styles from "../styles/Template.module.css";
import TemplateBox from "../components/TemplateBox";

const TemplateList = ({ templates, total }) => (
  <div className={styles.mainContainer}>
    <div className={styles.headerTitle}>
      <span>All Templates</span>
      <span>{total} templates</span>
    </div>
    <div className={styles.grid}>
      {templates && templates.map((content) => <TemplateBox {...content} />)}
    </div>
  </div>
);

export default TemplateList;
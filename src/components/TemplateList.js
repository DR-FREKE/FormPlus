import React from "react";
import { connect } from "react-redux";
import styles from "../styles/Template.module.css";
import TemplateBox from "../components/TemplateBox";

const TemplateList = ({ templates, total, name, ...props }) => (
  <div className={styles.mainContainer}>
    <div className={styles.headerTitle}>
      <span>{name || "All Templates"}</span>
      <span>
        {total} templates{" "}
        {props.filtering == true && name != "All Templates" ? "found" : ""}
      </span>
    </div>
    <div className={styles.grid}>
      {templates && templates.map((content) => <TemplateBox {...content} />)}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  filtering: state.template.filtering,
  sorting: state.template.sorting,
  date_sorting: state.template.date_sorting,
  searching: state.template.searching,
});

export default connect(mapStateToProps, {})(TemplateList);

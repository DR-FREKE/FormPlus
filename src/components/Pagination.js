import React from "react";
import styles from "../styles/Template.module.css";

const Pagination = ({ total, ...props }) => (
  <div className={styles.paginateContainer}>
    {total && (
      <>
        <div className={styles.prev}>
          <span
            onClick={props.previous}
            style={{ display: props.currentPage == 1 ? "none" : "block" }}>
            &larr; Previous
          </span>
        </div>
        <div className={styles.numbers}>
          <span>
            <span className={styles.active}>{props.currentPage}</span> of{" "}
            {total}
          </span>
        </div>
        <div className={styles.next}>
          <span
            onClick={props.next}
            style={{ display: props.currentPage == total ? "none" : "block" }}>
            Next &rarr;
          </span>
        </div>
      </>
    )}
  </div>
);

export default Pagination;

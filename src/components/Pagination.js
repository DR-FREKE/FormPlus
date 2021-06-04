import React from "react";
import styles from "../styles/Template.module.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Pagination = ({ total, totalPageNum, ...props }) => (
  <div className={styles.paginateContainer}>
    {total > 0 && (
      <>
        <div className={styles.prev}>
          <div
            className={styles.content}
            style={{ display: props.currentPage == 1 ? "none" : "flex" }}>
            <FiChevronLeft />
            <span onClick={props.previous}>Previous</span>
          </div>
        </div>
        <div className={styles.numbers}>
          <span>
            <span className={styles.active}>{props.currentPage}</span> of{" "}
            {Math.ceil(total / props.numberonPage)}
          </span>
        </div>
        <div className={styles.next}>
          <div
            className={styles.content}
            style={{
              display:
                props.currentPage == Math.ceil(total / props.numberonPage)
                  ? "none"
                  : "flex",
            }}>
            <span onClick={props.next}>Next</span>
            <FiChevronRight />
          </div>
        </div>
      </>
    )}
  </div>
);

export default Pagination;

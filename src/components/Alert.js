import React from "react";
import { BsInfoCircle } from "react-icons/bs";

const Banner = ({ styles }) => (
  <div className={styles.alertDiv}>
    <div className={styles.alert}>
      <BsInfoCircle className={styles.icon} />
      <span>
        Tada! Get started with a free template, Can't find what you are looking
        for? Search from the 1000+ available templates
      </span>
      {/* <span className={styles.closeBtn}>&times;</span> */}
    </div>
  </div>
);

export default Banner;

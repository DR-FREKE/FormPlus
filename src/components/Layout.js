import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => (
  <>
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  </>
);

Layout.propTypes = {};

export default Layout;

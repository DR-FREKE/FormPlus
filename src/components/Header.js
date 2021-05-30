import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";

export const Dropdown = ({ name, children }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "") {
      alert(value);
    }
  }, [value]);

  return (
    <fieldset>
      <legend>{name}</legend>
      <select
        name="some name"
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        {children}
      </select>
    </fieldset>
  );
};

const Header = () => (
  <div className={styles.topBar}>
    <div className={styles.searchDiv}>
      <div className={styles.searchInput}>
        <input placeholder="Search Template" />
        <i className="fa fa-search" style={{ fontWeight: "lighter" }}></i>
      </div>
    </div>
    <div className={styles.sortDiv}>
      <span>Sort By:</span>
      <Dropdown name="Category">
        <option value="All">All</option>
        <option value="Education">Education</option>
        <option value="E-commerce">E-commerce</option>
        <option value="Health">Health</option>
      </Dropdown>
      <Dropdown name="Order">
        <option>Default</option>
      </Dropdown>
      <Dropdown name="Date">
        <option>Default</option>
      </Dropdown>
    </div>
  </div>
);

export default Header;

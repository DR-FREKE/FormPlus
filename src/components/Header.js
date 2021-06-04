import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "../styles/Header.module.css";
import { IoIosSearch } from "react-icons/io";

export const Dropdown = ({ name, children, ...props }) => (
  <fieldset>
    <legend>{name}</legend>
    <select name={name} value={props.value} onChange={(e) => props.setValue(e)}>
      {children}
    </select>
  </fieldset>
);

const Header = (props) => {
  const [value, setValue] = useState({
    category: "",
    order: "",
    date: "",
    search: "",
  });

  useEffect(() => {
    if (value.category != "") props.runFilter(value.category);
    if (value.order != "") props.sortOrder(value.order);

    if (value.search.length > 0) props.search(value.search);
    // resetInput();
  }, [value]);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const resetInput = () => {
    if (value.category != "") {
      setValue({
        ...value,
        order: "default",
      });
    }
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.searchDiv}>
        <div className={styles.searchInput}>
          <input
            placeholder="Search Template"
            name="search"
            onChange={handleChange}
          />
          <IoIosSearch
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => props.search(value.search)}
          />
        </div>
      </div>
      <div className={styles.sortDiv}>
        <span>Sort By:</span>
        <Dropdown
          name="category"
          value={value.category}
          setValue={handleChange}>
          <option value="All Templates">All</option>
          <option value="Education">Education</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Health">Health</option>
        </Dropdown>
        <Dropdown name="order" value={value.order} setValue={handleChange}>
          <option value={value.order == "" ? "default" : ""}>Default</option>
          <option value="asc">Ascending</option>
          <option value="dsc">Desending</option>
        </Dropdown>
        <Dropdown name="date" value={value.date} setValue={handleChange}>
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="dsc">Desending</option>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;

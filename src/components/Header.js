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
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (category != "") props.runFilter(category);
    if (order != "") props.sortOrder(order);
    if (date != "") props.sortDate(date);
  }, [category, order, search, date]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setOrder("");
    setDate("");
    setSearch("");
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value, checkSearchField(e.target.value));
  };

  const checkSearchField = (val) => {
    props.search(val);
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.searchDiv}>
        <div className={styles.searchInput}>
          <input
            placeholder="Search Template"
            name="search"
            value={search}
            onChange={handleSearchChange}
          />
          <IoIosSearch
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => props.search(search)}
          />
        </div>
      </div>
      <div className={styles.sortDiv}>
        <span>Sort By:</span>
        <Dropdown
          name="category"
          value={category}
          setValue={handleCategoryChange}>
          <option value="All Templates">All</option>
          <option value="Education">Education</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Health">Health</option>
        </Dropdown>
        <Dropdown name="order" value={order} setValue={handleOrderChange}>
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="dsc">Desending</option>
        </Dropdown>
        <Dropdown name="date" value={date} setValue={handleDateChange}>
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="dsc">Desending</option>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import styles from "./SearchBar.module.scss";
import { FaSearch } from "react-icons/fa";

type Props = {
  placeholder: string;
};

const SearchBar = ({ placeholder }: Props) => {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder={placeholder} className={styles.searchBar__inputText} />
      <FaSearch />
    </div>
  );
};

export default SearchBar;

import React from "react";

import CategoryFilter from "./categoryFilter";
import CriterionSorting from "./criterionSorting";

import styles from "./sorting.module.scss";

const SortingBlock = () => {
  return (
    <div className={styles.sortingWrapper}>
      <CategoryFilter />
      <CriterionSorting />
    </div>
  );
};

export default SortingBlock;

import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "toolkit";
import { setCategory, changeHeader } from "toolkit/slices/filterSlice";

import { categoriesList } from "constants/categoriesList";

import styles from "./sorting.module.scss";

function CategoryFilter() {
  const categoryId = useSelector(
    (state: RootState) => state.filters.categoryId
  );

  const dispatch = useDispatch();

  const filterPizzas = (categoryValue: string, index: number) => {
    return () => {
      dispatch(setCategory(index));
      dispatch(changeHeader(categoryValue));
    };
  };

  return (
    <ul className={styles.categories}>
      {categoriesList.map((category, index) => (
        <li
          key={category}
          onClick={filterPizzas(category, index)}
          className={classNames(styles.category, {
            [styles.active]: categoryId === index,
          })}
        >
          {category}
        </li>
      ))}
    </ul>
  );
}
export default CategoryFilter;

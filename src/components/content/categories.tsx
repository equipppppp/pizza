import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, changeHeader } from "../../toolkit/slices/filterSlice";
import { RootState } from "../../toolkit";

import styles from "./content.module.scss";

const items = ["Все", "Мясные", "Вегетарианские", "Острые"];

function Categories() {
  const categoryId = useSelector(
    (state: RootState) => state.filters.categoryId
  );

  const dispatch = useDispatch();

  const filterPizzas = (categoryValue: string, index: number) => {
    dispatch(setCategory(index));
    dispatch(changeHeader(categoryValue));
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item}
          onClick={() => filterPizzas(item, index)}
          className={
            styles.values + (categoryId === index ? " " + styles.active : "")
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
export default Categories;

import React from "react";
import { useDispatch } from "react-redux";
import {
  addPizza,
  removePizza,
  removePizzas,
  PizzaTInB,
} from "../../toolkit/slices/basketSlice";

import styles from "./basket.module.scss";

const PizzaInBasket: React.FC<PizzaTInB> = ({
  name,
  imageURL,
  price,
  size,
  type,
  count,
}) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(
      addPizza({
        name,
        size,
        type,
      } as PizzaTInB)
    );
  };
  const onClickMinus = () => {
    dispatch(
      removePizza({
        name,
        size,
        type,
      } as PizzaTInB)
    );
  };

  const deletePizzas = () => {
    dispatch(removePizzas({ name, size, type } as PizzaTInB));
  };
  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <img src={imageURL} alt="pizza" />
        <div className={styles.info}>
          <p>{name}</p>
          <span>
            {type === 0 ? "Тонкое тесто, " : "Стандартное тесто, "}
            {size} см
          </span>
        </div>
      </div>
      <div className={styles.quantity}>
        <svg
          onClick={onClickMinus}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="24"
            fill="white"
            stroke="#EB5A1E"
            stroke-width="2"
          />
          <rect x="12" y="24" width="26" height="2" fill="#EB5A1E" />
        </svg>
        <span>{count}</span>
        <svg
          onClick={onClickPlus}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="24"
            fill="white"
            stroke="#EB5A1E"
            stroke-width="2"
          />
          <rect x="12" y="24" width="26" height="2" fill="#EB5A1E" />
          <rect x="24" y="12" width="2" height="26" fill="#EB5A1E" />
        </svg>
      </div>
      <div className={styles.price}>{price * count} ₽</div>
      <img
        style={{ cursor: "pointer" }}
        onClick={deletePizzas}
        width={32}
        height={32}
        src="./images/cancel.png"
        alt="cancel"
      />
    </div>
  );
};

export default PizzaInBasket;

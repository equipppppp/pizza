import React from "react";
import { useDispatch } from "react-redux";
import {
  addPizza,
  removePizza,
  deleteSelectedPizzas,
  PizzaInBasketType,
} from "toolkit/slices/basketSlice";

import Counter from "components/UI/counter/counter";

import styles from "./pizzaInBasket.module.scss";

const PizzaInBasket: React.FC<PizzaInBasketType> = ({
  name,
  imageURL,
  price,
  size,
  type,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickMinus = () => {
    dispatch(
      removePizza({
        name,
        size,
        type,
      } as PizzaInBasketType)
    );
  };

  const onClickPlus = () => {
    dispatch(
      addPizza({
        name,
        size,
        type,
      } as PizzaInBasketType)
    );
  };

  const onClickDelete = () => {
    dispatch(deleteSelectedPizzas({ name, size, type } as PizzaInBasketType));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.pizzaInfo}>
        <img className={styles.pizzaIMG} src={imageURL} alt="pizza" />
        <div>
          <h3>{name}</h3>
          <div className={styles.description}>
            {type === 0 ? "Тонкое тесто, " : "Стандартное тесто, "}
            {size} см
          </div>
        </div>
      </div>
      <Counter
        count={count}
        onClickMinus={onClickMinus}
        onClickPlus={onClickPlus}
        adaptive
      />
      <div className={styles.price}>{price * count} ₽</div>
      <svg
        onClick={onClickDelete}
        className={styles.deletePizza}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M19.7479 17.9557L17.4993 15.7071L19.7479 13.4585C20.1618 13.0446 20.1618 12.3734 19.7479 11.9595C19.334 11.5455 18.6628 11.5455 18.2488 11.9595L16.0002 14.2081L13.7516 11.9595C13.3377 11.5455 12.6665 11.5455 12.2526 11.9595C11.8386 12.3734 11.8386 13.0446 12.2526 13.4585L14.5012 15.7071L12.2526 17.9557C11.8386 18.3696 11.8386 19.0409 12.2526 19.4548C12.6665 19.8687 13.3377 19.8687 13.7516 19.4548L16.0002 17.2062L18.2488 19.4548C18.6628 19.8687 19.334 19.8687 19.7479 19.4548C20.1618 19.0409 20.1618 18.3696 19.7479 17.9557Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default PizzaInBasket;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addPizza,
  removePizza,
  PizzaTInB,
} from "../../toolkit/slices/basketSlice";
import { PizzaT } from "../../toolkit/slices/pizzaSlice";
import { RootState } from "../../toolkit";

import styles from "./content.module.scss";

const PizzaBlock: React.FC<PizzaT> = ({
  id,
  name,
  imageURL,
  price,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeDough, setActiveDough] = React.useState(0);
  const pizzasInBasket = useSelector(
    (state: RootState) => state.basket.pizzasInBasket
  );
  const { sortId } = useSelector((state: RootState) => state.filters);
  React.useEffect(() => {
    setActiveDough(0);
    setActiveSize(0);
  }, [sortId]);

  const totalCount = pizzasInBasket
    .filter((pizza) => pizza.name === name)
    .reduce((acc, pizza) => acc + pizza.count, 0);
  const totalPrice = pizzasInBasket
    .filter((pizza) => pizza.name === name)
    .reduce((acc, pizza) => acc + pizza.count * pizza.price, 0);

  const onClickSize = (index: number) => {
    setActiveSize(index);
  };
  const onClickDough = (index: number) => {
    setActiveDough(index);
  };

  const onIncrement = () => {
    dispatch(
      addPizza({
        name,
        imageURL,
        price: price[activeSize],
        size: sizes[activeSize],
        type: types[activeDough],
      } as PizzaTInB)
    );
  };

  type PizzaTForSearch = {
    name: string;
    size: number;
    type: number;
  };

  const isInBasket = (pizza: PizzaTForSearch) => {
    return pizzasInBasket.some(
      (elem) =>
        elem.name === pizza.name &&
        elem.size === pizza.size &&
        elem.type === pizza.type
    );
  };

  const onDecrement = () => {
    if (
      isInBasket({ name, size: sizes[activeSize], type: types[activeDough] })
    ) {
      dispatch(
        removePizza({
          name,
          imageURL,
          price: price[activeSize],
          size: sizes[activeSize],
          type: types[activeDough],
        } as PizzaTInB)
      );
    } else {
      alert(
        "Такой пиццы в корзине нет, наверное вы ошиблись с размером или тестом"
      );
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/pizza/${id}`}>
        <img className={styles.img} src={imageURL} alt="pizza" />
        <h2>{name}</h2>
      </Link>

      <div className={styles.info}>
        <div className={styles.dough}>
          {types.map((type, index) => (
            <div
              key={type}
              onClick={() => onClickDough(index)}
              className={activeDough === index ? styles.active : ""}
            >
              {type === 0 ? "Тонкое" : "Стандартное"}
            </div>
          ))}
        </div>
        <div className={styles.size}>
          {sizes.map((size, index) => (
            <div
              key={size}
              onClick={() => onClickSize(index)}
              className={activeSize === index ? styles.active : ""}
            >
              {size} см.
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.price}>
          {totalCount ? totalPrice : price[activeSize]} ₽
        </div>
        <div className={totalCount ? styles.quantity : styles.disabled}>
          <svg
            onClick={onDecrement}
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
          <span>{totalCount ? totalCount : 0}</span>
          <svg
            onClick={onIncrement}
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
        <div className={styles.btn} onClick={onIncrement}>
          Добавить
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;

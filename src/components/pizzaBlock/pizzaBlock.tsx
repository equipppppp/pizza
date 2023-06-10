import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PizzaType } from "toolkit/slices/pizzaSlice";
import { RootState } from "toolkit";
import {
  addPizza,
  removePizza,
  PizzaInBasketType,
} from "toolkit/slices/basketSlice";

import MainButton from "components/UI/button/mainButton";
import Counter from "components/UI/counter/counter";

import styles from "./pizzaBlock.module.scss";

const PizzaBlock: React.FC<PizzaType> = ({
  id,
  name,
  imageURL,
  prices,
  sizes,
  types,
}) => {
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeDough, setActiveDough] = React.useState(0);

  const pizzasInBasket = useSelector(
    (state: RootState) => state.basket.pizzasInBasket
  );
  const { sortId } = useSelector((state: RootState) => state.filters);

  const dispatch = useDispatch();

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
    return () => {
      setActiveSize(index);
    };
  };
  const onClickDough = (index: number) => {
    return () => {
      setActiveDough(index);
    };
  };

  const onIncrement = () => {
    dispatch(
      addPizza({
        name,
        imageURL,
        price: prices[activeSize],
        size: sizes[activeSize],
        type: types[activeDough],
      } as PizzaInBasketType)
    );
  };

  const isInBasket = (pizza: PizzaInBasketType) => {
    return pizzasInBasket.some(
      (elem) =>
        elem.name === pizza.name &&
        elem.size === pizza.size &&
        elem.type === pizza.type
    );
  };

  const onDecrement = () => {
    if (
      isInBasket({
        name,
        size: sizes[activeSize],
        type: types[activeDough],
      } as PizzaInBasketType)
    ) {
      dispatch(
        removePizza({
          name,
          imageURL,
          price: prices[activeSize],
          size: sizes[activeSize],
          type: types[activeDough],
        } as PizzaInBasketType)
      );
    } else {
      alert(
        "Такой пиццы в корзине нет, наверное вы ошиблись с размером или тестом"
      );
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgBlock}>
        <Link to={`/pizza/${id}`}>
          <img className={styles.img} src={imageURL} alt="pizza" />
          <h2 className={styles.desktopeName}>{name}</h2>
        </Link>
      </div>
      <div className={styles.valuesBlock}>
        <h2 className={styles.mobileName}>{name}</h2>
        <div className={styles.values}>
          <div className={styles.valueContainer}>
            {types.map((type, index) => (
              <div
                key={type}
                onClick={onClickDough(index)}
                className={classNames(styles.item, {
                  [styles.active]: activeDough === index,
                })}
              >
                {type === 0 ? "Тонкое" : "Стандартное"}
              </div>
            ))}
          </div>
          <div className={styles.valueContainer}>
            {sizes.map((size, index) => (
              <div
                key={size}
                onClick={onClickSize(index)}
                className={classNames(styles.item, {
                  [styles.active]: activeSize === index,
                })}
              >
                {size} см.
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.price}>
            {totalCount ? totalPrice : prices[activeSize]} ₽
          </div>
          {totalCount > 0 && (
            <Counter
              count={totalCount}
              onClickMinus={onDecrement}
              onClickPlus={onIncrement}
            />
          )}
          <MainButton handleClick={onIncrement}>Добавить</MainButton>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;

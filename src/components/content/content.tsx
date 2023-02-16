import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { setPizzas } from "../../toolkit/slices/pizzaSlice";
import { RootState } from "../../toolkit";
import { PizzaT } from "../../toolkit/slices/pizzaSlice";

import PizzaBlock from "./pizzaBlock";
import Categories from "./categories";
import Sort from "./sort";

import styles from "./content.module.scss";

const Content: React.FC = () => {
  const pizzas = useSelector((state: RootState) => state.pizzas.pizzas);
  const pizzasInBasket = useSelector(
    (state: RootState) => state.basket.pizzasInBasket
  );
  const { categoryId, sortId, header } = useSelector(
    (state: RootState) => state.filters
  );
  const isMount = React.useRef(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isMount.current) {
      const data = JSON.stringify(pizzasInBasket);
      localStorage.setItem("basket", data);
    } else {
      isMount.current = true;
    }
  }, [pizzasInBasket]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<PizzaT[]>(
          `https://63629b1266f75177ea33fe5e.mockapi.io/sneakers?category=${categoryId}&sortBy=${
            sortId === 0 ? "rating" : "price"
          }&order=desc`
        );
        dispatch(setPizzas(data));
      } catch (error) {
        alert("Ошибка в загрузке данных, попробуй позже");
        console.log(error);
      }
    })();
  }, [dispatch, categoryId, sortId]);

  return (
    <>
      <div className={styles.sortContainer}>
        <Categories />
        <Sort />
      </div>
      <h1>{header} пиццы</h1>
      <div className={styles.pizzas}>
        {pizzas &&
          pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};

export default Content;

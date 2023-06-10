import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "toolkit";
import { setPizzas } from "toolkit/slices/pizzaSlice";
import { PizzaType } from "toolkit/slices/pizzaSlice";

import PizzaBlock from "components/pizzaBlock/pizzaBlock";

import styles from "./pizzas.module.scss";

const Pizzas = () => {
  const pizzas = useSelector((state: RootState) => state.pizzas.pizzas);
  const { categoryId, sortId, header } = useSelector(
    (state: RootState) => state.filters
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<PizzaType[]>(
          `https://63629b1266f75177ea33fe5e.mockapi.io/sneakers?category=${categoryId}&sortBy=${
            sortId === 0 ? "rating" : "prices"
          }&order=desc`
        );
        dispatch(setPizzas(data));
      } catch (error) {
        alert("Ошибка в загрузке данных, попробуй позже");
        console.log(error);
      }
    })();
  }, [categoryId, sortId]);

  return (
    <>
      <h1>{header} пиццы</h1>
      <div className={styles.pizzas}>
        {pizzas &&
          pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};

export default Pizzas;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../toolkit/slices/basketSlice";
import PizzaInBasket from "./pizzaInBasket";
import styles from "./basket.module.scss";
import { RootState } from "../../toolkit";

const Basket: React.FC = () => {
  const { pizzasInBasket, quantity, totalPrice } = useSelector(
    (state: RootState) => state.basket
  );
  const dispatch = useDispatch();
  const onClickClear = () => {
    dispatch(clearBasket());
  };

  return (
    <>
      <div className={styles.container}>
        {pizzasInBasket.length > 0 ? (
          <>
            <div className={styles.header}>
              <img src="./images/basket.png" alt="basket" />
              <img
                onClick={onClickClear}
                src="./images/clear.png"
                alt="clear"
              />
            </div>
            {pizzasInBasket.map((pizza, index) => (
              <PizzaInBasket key={index} {...pizza} />
            ))}
            <div className={styles.footer}>
              <div>
                Всего пицц:{" "}
                <span className={styles.totalQ}>{quantity} шт.</span>
              </div>
              <div>
                Сумма заказа:{" "}
                <span className={styles.totalP}>{totalPrice} ₽</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.empty}>Корзина пуста </div>
            <div className={styles.text}>
              Вероятней всего, вы не заказывали ещё пиццу. <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </div>
            <img
              className={styles.mt10}
              width={300}
              height={255}
              src="./images/empty.png"
              alt="empty"
            />
            <Link to="/">
              <button className={styles.ma}>
                Вернуться <br />
                на главную
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Basket;

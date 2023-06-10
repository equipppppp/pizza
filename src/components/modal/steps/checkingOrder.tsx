import React from "react";
import classNames from "classnames";
import { RootState } from "toolkit";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder } from "toolkit/slices/modalSlice";

import MainButton from "components/UI/button/mainButton";

import styles from "../modal.module.scss";

const CheckingOrder = () => {
  const { pizzasInBasket, totalPrice } = useSelector(
    (state: RootState) => state.basket
  );

  const dispatch = useDispatch();

  const onClickConfirmOrder = () => {
    dispatch(confirmOrder());
  };

  return (
    <>
      <h3>Проверьте ваш заказ</h3>
      <ol className={classNames(styles.list, styles.ol)}>
        {pizzasInBasket.map((pizza) => (
          <li key={`${pizza.name}+${pizza.size}+${pizza.type}`}>
            {pizza.name}, {pizza.size} см. - {pizza.count} шт.
          </li>
        ))}
      </ol>
      <div>
        Сумма к оплате: <b>{totalPrice} руб.</b>
      </div>
      <MainButton handleClick={onClickConfirmOrder}>Все верно</MainButton>
    </>
  );
};

export default CheckingOrder;

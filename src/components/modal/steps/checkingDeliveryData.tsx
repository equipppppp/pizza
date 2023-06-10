import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "toolkit";
import { confirmData, toggleEnterData } from "toolkit/slices/modalSlice";
import { getDeliveryTime } from "toolkit/slices/deliveryDataSlice";

import MainButton from "components/UI/button/mainButton";

import styles from "../modal.module.scss";

const CheckingDeliveryData = () => {
  const { deliveryData } = useSelector(
    (state: RootState) => state.deliveryData
  );
  const { phone, city, street, home, flat, comment } = deliveryData;

  const dispatch = useDispatch();

  const onConfirmData = () => {
    console.log(deliveryData);
    //Post запрос на отправку данных

    dispatch(getDeliveryTime());
    dispatch(confirmData());
  };

  const correctDeliveryData = () => {
    dispatch(toggleEnterData());
  };

  return (
    <>
      <h3>Проверьте указанный адрес и телефон</h3>
      <ul className={styles.list}>
        <li>Телефон - {phone.value};</li>
        <li>
          Адрес доставки - {`${city.value}`}, ул. {`${street.value}`}, д.{" "}
          {`${home.value}`}
          {flat.value ? `, кв. ${flat.value}` : ""};
        </li>
        <li>Комментарий к заказу - {comment.value ? comment.value : "нет"}.</li>
      </ul>
      <MainButton handleClick={onConfirmData}>
        Все верно, оформить заказ
      </MainButton>
      <MainButton handleClick={correctDeliveryData} grey>
        Исправить
      </MainButton>
    </>
  );
};

export default CheckingDeliveryData;

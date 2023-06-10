import React from "react";
import { Link } from "react-router-dom";

import MainButton from "components/UI/button/mainButton";

import { empty } from "assets";

import styles from "./emptyBasket.module.scss";

const EmptyBasket = () => {
  return (
    <div className={styles.empty}>
      <h2 className={styles.title}>Корзина пуста </h2>
      <div className={styles.text}>
        Вероятней всего, вы не заказывали ещё пиццу. <br />
        Для того, чтобы заказать пиццу, перейдите на главную страницу.
      </div>
      <img width={300} height={255} src={empty} alt="empty" />
      <Link to="/pizza">
        <MainButton>Вернуться на главную</MainButton>
      </Link>
    </div>
  );
};

export default EmptyBasket;

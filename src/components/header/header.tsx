import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./header.module.scss";
import { RootState } from "../../toolkit";

const Header: React.FC = () => {
  const { quantity, totalPrice } = useSelector(
    (state: RootState) => state.basket
  );

  return (
    <div className={styles.header}>
      <Link to="/">
        {" "}
        <img src="./images/logo.png" alt="logo" />
      </Link>
      <Link to="/basket">
        <div className={styles.basketBtn}>
          <div className={styles.devider}></div>
          <div className={styles.cost}>{totalPrice} ₽</div>
          <div className={styles.basket}>
            <img src="./images/basket.svg" alt="basket" />
            {quantity}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Header;

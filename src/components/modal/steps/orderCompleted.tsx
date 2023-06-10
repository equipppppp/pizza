import React from "react";
import { RootState } from "toolkit";
import { useSelector } from "react-redux";

import MainButton from "components/UI/button/mainButton";

type OrderCompletedProps = {
  handleClick: () => void;
};

const OrderCompleted: React.FC<OrderCompletedProps> = ({ handleClick }) => {
  const { deliveryTime } = useSelector(
    (state: RootState) => state.deliveryData
  );

  return (
    <>
      <h3>Ваш заказ успешно оформлен!</h3>
      <div>
        Ожидаемое время доставки - <b>{deliveryTime}</b>
      </div>
      <MainButton handleClick={handleClick}>Вернуться на главную</MainButton>
    </>
  );
};

export default OrderCompleted;

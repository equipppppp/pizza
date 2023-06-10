import React from "react";
import { RootState } from "toolkit";
import { useSelector } from "react-redux";

import EmptyBasket from "components/basket/emptyBasket/emptyBasket";
import PizzasInBasket from "components/basket/pizzasInBasket";
import Modal from "components/modal/modal";

const Basket: React.FC = () => {
  const { pizzasInBasket } = useSelector((state: RootState) => state.basket);
  const { isHidden } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {pizzasInBasket.length > 0 ? (
        <>
          <PizzasInBasket />
          {!isHidden && <Modal />}
        </>
      ) : (
        <EmptyBasket />
      )}
    </>
  );
};

export default Basket;

import React from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "toolkit";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "toolkit/slices/basketSlice";
import { toggleModal } from "toolkit/slices/modalSlice";

import CheckingOrder from "./steps/checkingOrder";
import ModalForm from "./steps/modalForm";
import CheckingDeliveryData from "./steps/checkingDeliveryData";
import OrderCompleted from "./steps/orderCompleted";

import { closeButton } from "assets";

import styles from "./modal.module.scss";

const Modal: React.FC = () => {
  const { isOrderConfirmed, isDataEntered, isDataConfirmed } = useSelector(
    (state: RootState) => state.modal
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(toggleModal());
    if (isDataConfirmed) {
      dispatch(clearBasket());
      navigate("/pizza");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <img
          src={closeButton}
          alt="close"
          className={styles.closeButton}
          onClick={closeModal}
        />
        {!isOrderConfirmed ? (
          <CheckingOrder />
        ) : !isDataEntered ? (
          <>
            <ModalForm />
          </>
        ) : !isDataConfirmed ? (
          <>
            <CheckingDeliveryData />
          </>
        ) : (
          <>
            <OrderCompleted handleClick={closeModal} />
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import { RootState } from "toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeDeliveryData,
  setWasFocused,
} from "toolkit/slices/deliveryDataSlice";
import { toggleEnterData } from "toolkit/slices/modalSlice";

import MainInput from "../../UI/input/mainInput";
import MainButton from "components/UI/button/mainButton";

import { validation } from "./validation";
import { inputs } from "constants/inputs";

import styles from "./modalForm.module.scss";

const ModalForm = () => {
  const { deliveryData, deliveryDataErrors } = useSelector(
    (state: RootState) => state.deliveryData
  );

  const dispatch = useDispatch();

  const hasErrors = Object.values(deliveryDataErrors).some(
    (value) => value.length > 0
  );

  let hasData = false;

  for (const [key, value] of Object.entries(deliveryData)) {
    if (!Object.keys(deliveryDataErrors).includes(key)) {
      continue;
    }
    if (value.value.length === 0) {
      hasData = false;
      break;
    } else {
      hasData = true;
    }
  }

  const enterDeliveryData = () => {
    dispatch(toggleEnterData());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.target;
    let name = event.target.name;
    let value = event.target.value;

    dispatch(onChangeDeliveryData(target));

    if (deliveryData[event.target.name].wasFocused) {
      validation(name, value, target, dispatch);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let target = event.target;
    let name = event.target.name;
    let value = event.target.value;

    validation(name, value, target, dispatch);

    dispatch(setWasFocused(target));
  };

  return (
    <>
      <h3>Введите данные для доставки</h3>
      <form className={styles.form}>
        <div className={styles.adresWrapper}>
          {inputs.map((input) => (
            <MainInput
              key={input.name}
              {...input}
              value={deliveryData[input.name].value}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={deliveryDataErrors[input.name]}
            />
          ))}
        </div>
        <MainButton
          fullWidth
          isDisabled={hasErrors || !hasData}
          handleClick={enterDeliveryData}
        >
          Подтвердить
        </MainButton>
      </form>
    </>
  );
};

export default ModalForm;

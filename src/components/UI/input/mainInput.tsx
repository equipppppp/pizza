import React from "react";
import classNames from "classnames";
import InputMask from "react-input-mask";

import styles from "./mainInput.module.scss";
import modalFormStyles from "../../modal/steps/modalForm.module.scss";

type LabelProps = {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  type: string;
  placeholder: string;
  required?: boolean;
  full?: boolean;
  mask?: string;
  error?: string;
};

const MainInput: React.FC<LabelProps> = ({
  label,
  required,
  handleChange,
  handleBlur,
  value,
  name,
  type,
  placeholder,
  full,
  mask,
  error,
}) => {
  return (
    <>
      <div
        className={classNames(styles.container, {
          [modalFormStyles.full]: full,
        })}
      >
        <label htmlFor={name} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
        {mask ? (
          <InputMask
            className={classNames(styles.input, {
              [styles.invalid]: error,
            })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            name={name}
            type={type}
            placeholder={placeholder}
            mask={mask}
          />
        ) : (
          <input
            className={classNames(styles.input, {
              [styles.invalid]: error,
            })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            name={name}
            type={type}
            placeholder={placeholder}
          />
        )}
        {error && <span className={styles.uncorrect}>{error}</span>}
      </div>
    </>
  );
};

export default MainInput;

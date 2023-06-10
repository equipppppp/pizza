import React from "react";
import classNames from "classnames";

import styles from "./mainButton.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  grey?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
}
const MainButton: React.FC<ButtonProps> = ({
  children,
  handleClick,
  grey = false,
  fullWidth = false,
  isDisabled = false,
}) => {
  return (
    <button
      onClick={handleClick}
      className={classNames(styles.button, {
        [styles.grey]: grey,
        [styles.disabled]: isDisabled,
        [styles.fullWidth]: fullWidth,
      })}
    >
      {children}
    </button>
  );
};

export default MainButton;

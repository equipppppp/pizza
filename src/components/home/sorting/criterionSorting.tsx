import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "toolkit";
import { setSort } from "toolkit/slices/filterSlice";

import { sortingList } from "constants/sortingList";

import styles from "./sorting.module.scss";

const CriterionSorting: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const sortId = useSelector((state: RootState) => state.filters.sortId);

  const dispatch = useDispatch();

  const popupRef = React.useRef<HTMLDivElement>(null);

  const chosenCategory = sortingList[sortId];

  const handleOutsideClick = (event: MouseEvent) => {
    const _event = event as MouseEvent & {
      path: Node[];
    };
    if (popupRef.current && !_event.path.includes(popupRef.current)) {
      setIsPopupOpen(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, []);

  const sortPizza = (index: number) => {
    return () => {
      dispatch(setSort(index));
      setIsPopupOpen(false);
    };
  };

  return (
    <>
      <div ref={popupRef} className={styles.sortByCriterion}>
        Сортировка по:{" "}
        <span
          className={styles.chosenSort}
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          {chosenCategory}
        </span>
        {isPopupOpen && (
          <div className={styles.popup}>
            {sortingList.map((sortItem, index) => (
              <div
                onClick={sortPizza(index)}
                className={classNames(styles.popupElem, {
                  [styles.active]: sortId === index,
                })}
                key={sortItem}
              >
                {sortItem}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CriterionSorting;

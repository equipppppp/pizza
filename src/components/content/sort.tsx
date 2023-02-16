import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../../toolkit/slices/filterSlice";
import { RootState } from "../../toolkit";

import styles from "./content.module.scss";

const items = ["популярности", "цене"];

const Sort: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const sortId = useSelector((state: RootState) => state.filters.sortId);
  const dispatch = useDispatch();

  const popupRef = React.useRef<HTMLDivElement>(null);

  const chosenCategory = items[sortId];

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
    dispatch(setSort(index));
    setIsPopupOpen(false);
  };

  return (
    <>
      <div ref={popupRef} className={styles.sortByCriterion}>
        Сортировка по:{" "}
        <span onClick={() => setIsPopupOpen(!isPopupOpen)}>
          {chosenCategory}
        </span>
        {isPopupOpen && (
          <div className={styles.popup}>
            {items.map((item, index) => (
              <div
                onClick={() => sortPizza(index)}
                className={
                  styles.popupElem +
                  (sortId === index ? " " + styles.active : "")
                }
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Sort;

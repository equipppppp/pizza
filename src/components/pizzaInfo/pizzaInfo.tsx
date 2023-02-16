import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./pizzaInfo.module.scss";

type Pizza = {
  imageURL: string;
  name: string;
  sizes: number[];
  price: number[];
};

const PizzaInfo: React.FC = () => {
  const [pizza, setPizza] = React.useState<Pizza>();

  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Pizza>(
          `https://63629b1266f75177ea33fe5e.mockapi.io/sneakers/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка в загрузке данных, попробуй позже");
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <>
      {pizza ? (
        <div className={styles.card}>
          <img className={styles.img} src={pizza.imageURL} alt="pizza" />
          <div className={styles.container}>
            <h2>Пицца: {pizza.name}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              maxime quibusdam blanditiis ullam voluptas quod, ea dolore
              recusandae ducimus incidunt delectus amet odio cumque saepe
            </p>
            <div className={styles.pizzaInfo}>
              <div>
                <span>Состав:</span>
                <p>Lorem, lorem, lorem, lorem, lorem</p>
              </div>
              <div className={styles.flex}>
                <span className={styles.mr15}>Цена:</span>
                <div>
                  {" "}
                  <ul>
                    {pizza.sizes.map((size) => (
                      <li key={size}>{size} см.</li>
                    ))}
                  </ul>
                  <ul className={styles.mt15}>
                    {pizza.price.map((item) => (
                      <li key={item}>{item} ₽</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </>
  );
};

export default PizzaInfo;

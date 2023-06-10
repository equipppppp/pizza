import React from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import PizzaBlock from "components/pizzaBlock/pizzaBlock";
import { PizzaType } from "toolkit/slices/pizzaSlice";

import styles from "../components/pizzaInfo/pizzaInfo.module.scss";
import MainButton from "components/UI/button/mainButton";

const PizzaInfo: React.FC = () => {
  const [pizza, setPizza] = React.useState<PizzaType>();

  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<PizzaType>(
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
        <>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <PizzaBlock {...pizza} />
            </div>

            <div className={styles.info}>
              <h3>Состав:</h3>
              <div>{pizza.ingridients}</div>
              <h3>Описание</h3>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                dolor ducimus delectus perspiciatis corrupti eius, ratione
                mollitia dolores beatae, laboriosam pariatur est quaerat dolorum
                incidunt? Delectus laudantium dicta explicabo quo mollitia
                consequuntur neque iure facere, porro culpa doloribus dolores
                eveniet aut fuga autem omnis consectetur quis impedit vitae, qui
                ipsa placeat iste? Assumenda, officiis? Ducimus, iste
                voluptatem. Quos, deserunt perferendis voluptates voluptas illum
                at minus officia excepturi voluptate repellat porro repudiandae
                nemo quasi qui laudantium commodi!
              </div>
              <Link to="/pizza  ">
                <MainButton>Вернуться на главную</MainButton>
              </Link>
            </div>
          </div>
        </>
      ) : (
        // <div className={styles.card}>
        //   <img className={styles.img} src={pizza.imageURL} alt="pizza" />
        //   <div className={styles.container}>
        //     <h2>Пицца: {pizza.name}</h2>
        //     <p>
        //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
        //       maxime quibusdam blanditiis ullam voluptas quod, ea dolore
        //       recusandae ducimus incidunt delectus amet odio cumque saepe
        //     </p>
        //     <div className={styles.pizzaInfo}>
        //       <div>
        //         <span>Состав:</span>
        //         <p>Lorem, lorem, lorem, lorem, lorem</p>
        //       </div>
        //       <div className={styles.flex}>
        //         <span className={styles.mr15}>Цена:</span>
        //         <div>
        //           {" "}
        //           <ul>
        //             {pizza.sizes.map((size) => (
        //               <li key={size}>{size} см.</li>
        //             ))}
        //           </ul>
        //           <ul className={styles.mt15}>
        //             {pizza.price.map((item) => (
        //               <li key={item}>{item} ₽</li>
        //             ))}
        //           </ul>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div>Загрузка...</div>
      )}
    </>
  );
};

export default PizzaInfo;

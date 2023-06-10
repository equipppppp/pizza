import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Basket from "pages/basket";
import PizzaInfo from "pages/pizzaInfo";
import { RootState } from "toolkit";
import { useSelector } from "react-redux";
import Layout from "components/Layout/Layout";

function App() {
  const isMount = React.useRef(false);
  const pizzasInBasket = useSelector(
    (state: RootState) => state.basket.pizzasInBasket
  );
  React.useEffect(() => {
    if (isMount.current) {
      const data = JSON.stringify(pizzasInBasket);
      localStorage.setItem("basket", data);
    } else {
      isMount.current = true;
    }
  }, [pizzasInBasket]);
  return (
    <Routes>
      <Route path="/pizza" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/pizza/:id" element={<PizzaInfo />} />
        <Route path="/pizza/basket" element={<Basket />} />
      </Route>
    </Routes>
  );
}

export default App;

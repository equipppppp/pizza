import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Content from "./components/content/content";
import Basket from "./components/basket/basket";
import PizzaInfo from "./components/pizzaInfo/pizzaInfo";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/pizza/:id" element={<PizzaInfo />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
}

export default App;

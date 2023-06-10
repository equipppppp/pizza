import React from "react";

import Pizzas from "components/home/pizzas/pizzas";
import SortingBlock from "components/home/sorting/sortingBlock";

const Content: React.FC = () => {
  return (
    <>
      <SortingBlock />
      <Pizzas />
    </>
  );
};

export default Content;

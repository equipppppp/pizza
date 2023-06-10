import { configureStore } from "@reduxjs/toolkit";

import pizzas from "./slices/pizzaSlice";
import filters from "./slices/filterSlice";
import basket from "./slices/basketSlice";
import modal from "./slices/modalSlice";
import deliveryData from "./slices/deliveryDataSlice";

const store = configureStore({
  reducer: {
    pizzas,
    filters,
    basket,
    modal,
    deliveryData,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

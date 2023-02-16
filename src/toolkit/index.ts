import { configureStore } from "@reduxjs/toolkit";

import pizzasReducer from "./slices/pizzaSlice";
import filtersReducer from "./slices/filterSlice";
import basketReduder from "./slices/basketSlice";

const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    filters: filtersReducer,
    basket: basketReduder,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

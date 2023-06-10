import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PizzaType = {
  id: string;
  name: string;
  imageURL: string;
  prices: number[];
  sizes: number[];
  types: number[];
  ingridients: string;
};
interface PizzasState {
  pizzas: PizzaType[];
}
const initialState: PizzasState = {
  pizzas: [],
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaType[]>) {
      state.pizzas = action.payload;
    },
  },
});

export default pizzaSlice.reducer;
export const { setPizzas } = pizzaSlice.actions;

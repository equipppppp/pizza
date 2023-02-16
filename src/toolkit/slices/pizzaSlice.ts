import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PizzaT = {
  id: string;
  name: string;
  imageURL: string;
  price: number[];
  sizes: number[];
  types: number[];
};
interface PizzasState {
  pizzas: PizzaT[];
}
const initialState: PizzasState = {
  pizzas: [],
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaT[]>) {
      state.pizzas = action.payload;
    },
  },
});

export default pizzaSlice.reducer;
export const { setPizzas } = pizzaSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PizzaInBasketType = {
  name: string;
  imageURL: string;
  price: number;
  size: number;
  type: number;
  count: number;
};

interface BasketState {
  pizzasInBasket: PizzaInBasketType[];
  quantity: number;
  totalPrice: number;
}

const items = localStorage.getItem("basket");

const pizzasInBasket: PizzaInBasketType[] = items ? JSON.parse(items) : [];

const countTotalPrice = (array: PizzaInBasketType[]) => {
  return array.reduce((acc, pizza) => acc + pizza.count * pizza.price, 0);
};
const countQuantity = (array: PizzaInBasketType[]) => {
  return array.reduce((acc, pizza) => acc + pizza.count, 0);
};

const quantity = countQuantity(pizzasInBasket);
const totalPrice = countTotalPrice(pizzasInBasket);

const initialState: BasketState = {
  pizzasInBasket,
  quantity,
  totalPrice,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<PizzaInBasketType>) {
      if (
        !state.pizzasInBasket.some(
          (pizza) =>
            pizza.name === action.payload.name &&
            pizza.size === action.payload.size &&
            pizza.type === action.payload.type
        )
      ) {
        state.pizzasInBasket.push({ ...action.payload, count: 1 });
        state.quantity = countQuantity(state.pizzasInBasket);
        state.totalPrice = countTotalPrice(state.pizzasInBasket);
      } else {
        const findedPizza = state.pizzasInBasket.find(
          (pizza) =>
            pizza.name === action.payload.name &&
            pizza.size === action.payload.size &&
            pizza.type === action.payload.type
        );
        if (findedPizza) findedPizza.count++;
        state.quantity = countQuantity(state.pizzasInBasket);
        state.totalPrice = countTotalPrice(state.pizzasInBasket);
      }
    },
    removePizza(state, action: PayloadAction<PizzaInBasketType>) {
      const findedPizza = state.pizzasInBasket.find(
        (pizza) =>
          pizza.name === action.payload.name &&
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      if (findedPizza)
        if (findedPizza.count > 1) {
          findedPizza.count--;
          state.quantity = countQuantity(state.pizzasInBasket);
          state.totalPrice = countTotalPrice(state.pizzasInBasket);
        } else {
          state.pizzasInBasket = state.pizzasInBasket.filter(
            (pizza) =>
              !(
                pizza.name === action.payload.name &&
                pizza.size === action.payload.size &&
                pizza.type === action.payload.type
              )
          );
          state.quantity = countQuantity(state.pizzasInBasket);
          state.totalPrice = countTotalPrice(state.pizzasInBasket);
        }
    },
    deleteSelectedPizzas(state, action: PayloadAction<PizzaInBasketType>) {
      state.pizzasInBasket = state.pizzasInBasket.filter(
        (pizza) =>
          !(
            pizza.name === action.payload.name &&
            pizza.size === action.payload.size &&
            pizza.type === action.payload.type
          )
      );
      state.quantity = countQuantity(state.pizzasInBasket);
      state.totalPrice = countTotalPrice(state.pizzasInBasket);
    },
    clearBasket(state) {
      state.pizzasInBasket = [];
      state.quantity = 0;
      state.totalPrice = 0;
    },
  },
});

export default basketSlice.reducer;
export const { addPizza, removePizza, clearBasket, deleteSelectedPizzas } =
  basketSlice.actions;

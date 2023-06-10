import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
  categoryId: number;
  sortId: number;
  header: string;
};

const initialState: FilterState = {
  categoryId: 0,
  sortId: 0,
  header: "Все",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<number>) {
      state.sortId = action.payload;
    },
    changeHeader(state, action: PayloadAction<string>) {
      state.header = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setCategory, setSort, changeHeader } = filterSlice.actions;

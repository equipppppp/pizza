import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const errorMessages = {
  phone: "Номер телефона введен некорректно",
  city: "Минимум 3 символа",
  street: "Минимум 4 символа",
  home: "Минимум 1 символ",
};
type ValidateType = {
  input: EventTarget & HTMLInputElement;
  correct: boolean;
};
type RequiredDataType = {
  value: string;
  wasFocused: boolean;
};
interface DeliveryDataState {
  deliveryData: {
    phone: RequiredDataType;
    city: RequiredDataType;
    street: RequiredDataType;
    home: RequiredDataType;
    flat: RequiredDataType;
    comment: RequiredDataType;
  };
  deliveryDataErrors: {
    phone: string;
    city: string;
    street: string;
    home: string;
  };
  deliveryTime: string;
}

const initialState: DeliveryDataState = {
  deliveryData: {
    phone: { value: "", wasFocused: false },
    city: { value: "Москва", wasFocused: false },
    street: { value: "", wasFocused: false },
    home: { value: "", wasFocused: false },
    comment: { value: "", wasFocused: false },
    flat: { value: "", wasFocused: false },
  },
  deliveryDataErrors: {
    phone: "",
    city: "",
    street: "",
    home: "",
  },
  deliveryTime: "",
};

const deliveryDataSlice = createSlice({
  name: "deliveryData",
  initialState,
  reducers: {
    onChangeDeliveryData(
      state,
      action: PayloadAction<EventTarget & HTMLInputElement>
    ) {
      state.deliveryData = {
        ...state.deliveryData,
        [action.payload.name]: {
          ...state.deliveryData[action.payload.name],
          value: action.payload.value,
        },
      };
    },
    setWasFocused(
      state,
      action: PayloadAction<EventTarget & HTMLInputElement>
    ) {
      state.deliveryData = {
        ...state.deliveryData,
        [action.payload.name]: {
          ...state.deliveryData[action.payload.name],
          wasFocused: true,
        },
      };
    },
    onValidate(state, action: PayloadAction<ValidateType>) {
      if (action.payload.correct) {
        state.deliveryDataErrors = {
          ...state.deliveryDataErrors,
          [action.payload.input.name]: errorMessages[action.payload.input.name],
        };
      } else {
        state.deliveryDataErrors = {
          ...state.deliveryDataErrors,
          [action.payload.input.name]: "",
        };
      }
    },
    getDeliveryTime(state) {
      let presentHours = new Date().getHours();
      let presentMins = new Date().getMinutes();
      let deliveryMins =
        presentMins + 30 >= 60 ? presentMins + 30 - 60 : presentMins + 30;
      let deliveryHours =
        presentMins + 30 >= 60 ? presentHours + 2 : presentHours + 1;
      state.deliveryTime = `${deliveryHours} ч. ${deliveryMins} мин.`;
    },
  },
});

export default deliveryDataSlice.reducer;
export const {
  onChangeDeliveryData,
  setWasFocused,
  onValidate,
  getDeliveryTime,
} = deliveryDataSlice.actions;

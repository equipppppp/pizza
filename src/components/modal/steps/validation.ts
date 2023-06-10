import { onValidate } from "toolkit/slices/deliveryDataSlice";

export function validation(
  name: string,
  value: string,
  target: EventTarget & HTMLInputElement,
  callback: any
) {
  switch (name) {
    case "phone":
      let uncorrectPhone = value.includes("_") || value.length === 0;
      callback(onValidate({ input: target, correct: uncorrectPhone }));
      break;
    case "city":
      let uncorrectCity = value.length < 3;
      callback(onValidate({ input: target, correct: uncorrectCity }));
      break;
    case "street":
      let uncorrectStreet = value.length < 4;
      callback(onValidate({ input: target, correct: uncorrectStreet }));
      break;
    case "home":
      let uncorrectHome = value.length < 1;
      callback(onValidate({ input: target, correct: uncorrectHome }));
      break;

    default:
      break;
  }
}

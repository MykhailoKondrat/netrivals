import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockedProductList from "../../mocks/mockedProductList.json";
import { calculatePrice } from "./utils/calculatePrice";

export const FORMULA_ACTIONS = [
  "add",
  "deduct",
  "multiply",
  "divide",
  "",
] as const;

export type FormulaActions = typeof FORMULA_ACTIONS[number];
export interface ProductPriceModifierFormula {
  action: FormulaActions;
  value: number;
}

export interface Product {
  id: number;
  product_name: string;
  original_price: number;
  modified_price: number;
  formula: ProductPriceModifierFormula;
  image_url: string;
}
export interface ProductState {
  productsList: Array<Product>;
}
export interface SetFormula {
  id: number;
  action: FormulaActions;
  value: number;
}
const initialState: ProductState = {
  productsList: mockedProductList as Array<Product>,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFormula: (state, { payload }: PayloadAction<SetFormula>) => {
      const productIndex = state.productsList.findIndex(
        ({ id }) => id === payload.id
      );
      if (productIndex !== -1) {
        const newPrice = calculatePrice(
          payload.action,
          state.productsList[productIndex].original_price,
          payload.value
        );
        const hasAction = payload.action.length !== 0;
        state.productsList[productIndex].formula.action = payload.action;
        state.productsList[productIndex].formula.value = hasAction
          ? payload.value
          : 0;
        state.productsList[productIndex].modified_price = newPrice;
      }
      // NOTE: I would usually delete comments like this, keeping it FYI
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
  },
});

export const { setFormula } = productSlice.actions;

export default productSlice.reducer;

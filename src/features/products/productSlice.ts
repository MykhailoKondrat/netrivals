import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import mockedProductList from "../../mocks/mockedProductList.json";
import { calculatePrice } from "./utils/calculatePrice";
import {validateNewPrice} from './utils/validateNewPrice';

export type FormulaActions = "add" | "deduct" | "multiply" | "divide" | null;

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
}
export interface ProductState {
  productsList: Array<Product>;
  errorMessage: string;
}
export interface SetFormula {
  id: number;
  action: FormulaActions;
  value: number;
}
const initialState: ProductState = {
  productsList: [ ...mockedProductList ],
  errorMessage:''
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFormula: (state, { payload }: PayloadAction<SetFormula>) => {
      const productId = state.productsList.findIndex(({ id }) => id === payload.id);
      if (productId !== -1) {

        const newPrice = calculatePrice(
          payload.action,
          state.productsList[productId].original_price,
          payload.value
        );
        const errorMessage = validateNewPrice(newPrice)
        state.errorMessage = errorMessage
        if(errorMessage.length !== 0) {
          state.productsList[productId].formula.action = payload.action;
          state.productsList[productId].formula.value = payload.value;
          state.productsList[productId].modified_price = newPrice
        }
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

export const selectProducts = (state: RootState) => state.products;
export default productSlice.reducer;

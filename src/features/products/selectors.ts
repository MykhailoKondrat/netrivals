import { RootState } from "../../app/store";

export const SelectProductById = (idToRetrieve: number) => (state: RootState) =>
  state.products.productsList.find(({ id }) => id === idToRetrieve);

export const SelectAllProducts = (state:RootState) => state.products.productsList
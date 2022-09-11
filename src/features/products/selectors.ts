import { RootState } from "../../app/store";

export const selectProductById = (idToRetrieve: number) => (state: RootState) =>
  state.products.productsList.find(({ id }) => id === idToRetrieve);

export const selectAllProducts = (state:RootState) => state.products.productsList
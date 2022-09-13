import { FC, ReactElement } from "react";
import { selectProductById } from "../../selectors";
import PriceFormula from "../PriceFormula";
import { useAppSelector } from "../../../../app/store";
import { FormulaActions } from "../../productSlice";
import { PriceWrap } from "./styles";
interface ProductPriceProps {
  id: number;
}

export const ProductPrice: FC<ProductPriceProps> = ({ id }) => {
  const productDetails = useAppSelector(selectProductById(id));
   const initialPriceLabel = productDetails?.modified_price !== 0 ? 'Previous Price' : 'Current price'
  return productDetails ? (
    <PriceWrap>
      <h4> {initialPriceLabel}: ${productDetails.original_price}</h4>
      <PriceFormula
        id={id}
        action={productDetails.formula.action}
        value={productDetails.formula.value}
        initialPrice={productDetails.original_price}
      />
      {!!productDetails.modified_price && <h4>New Price: ${productDetails.modified_price}</h4> }
    </PriceWrap>
  ) : (
    <p>Product not found</p>
  );
};
export default ProductPrice;

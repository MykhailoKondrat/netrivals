import React from "react";
import { FC } from "react";
import ProductPrice from "../ProductPrice";
import { ProductCardWrap, ProductDetailsWrap, ProductImage } from "./styles";

interface ProductCardProps {
  image_url: string;
  product_name: string;
  id: number;
}
export const ProductCard: FC<ProductCardProps> = React.memo (({
  image_url,
  product_name,
  id,
}) => {
  return (
    <ProductCardWrap>
      <ProductImage src={image_url} />
      <ProductDetailsWrap>
        <h3>{product_name}</h3>
         <ProductPrice id={id} />
      </ProductDetailsWrap>
    </ProductCardWrap>
  );
});

export default ProductCard;

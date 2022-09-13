import React from "react";
import { AppWrap, ContentContainer, NavBar } from "./styles";
import { selectAllProducts } from "../products/selectors";
import ProductCard from "../products/components/ProductCard";
import { useAppSelector } from "../../app/store";

function App() {
  const products = useAppSelector(selectAllProducts);
  return (
    <AppWrap>
      <NavBar>
        <h4>NetRivals</h4>
        <p>Navigation stub</p>
      </NavBar>
      <ContentContainer>
        {/* Real-world UI would probably require react-window visualizer*/}
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            product_name={prod.product_name}
            image_url={prod.image_url}
          />
        ))}
      </ContentContainer>
    </AppWrap>
  );
}

export default App;

import React from "react";
import { AppWrap, NavBar } from "./styles";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../products/selectors";

function App() {
  const products = useSelector(selectAllProducts);
  return (
    <AppWrap>
      <NavBar />
      <div>
        {products.map((prod) => (
          <div key={prod.id}>
            <p>{prod.product_name}</p>
            <p>{prod.original_price}</p>
          </div>
        ))}
      </div>
    </AppWrap>
  );
}

export default App;

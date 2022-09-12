import styled from 'styled-components';

export const ProductCardWrap = styled.section`
  display: grid;
  padding: 24px;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr;
  column-gap: 8px;
  box-shadow: 8px 8px 24px -25px rgba(66, 68, 90, 1);
  p, h4,h3{
    margin: 0;
    padding: 0;
  }
  @media (max-width: 700px) {
    align-items: center;
    text-align: center;
    grid-template-columns: 100%;
    grid-template-rows: 100px 1fr;
  }
`

export const ProductImage = styled.img`
  align-self: center;
  justify-self: center;
`

export const ProductDetailsWrap  = styled.div`
`


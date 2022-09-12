import styled from "styled-components";

export const AppWrap = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  overflow:hidden;
  @media (max-width: 700px) {
    grid-template-columns: 100%;
    grid-template-rows: 50px 1fr;
  }
`;
export const ContentContainer = styled.main`
  overflow: scroll;
`
export const NavBar = styled.nav`
  background-color: burlywood;
  position: sticky; 
  top: 0; 
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
   flex-direction: row;
  }
`;

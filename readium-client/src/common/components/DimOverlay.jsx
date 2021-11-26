import styled from "styled-components";

const DimOverlay = styled.div`
  background-color: grey;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 999;
  overflow: hidden;
`;

export default DimOverlay;

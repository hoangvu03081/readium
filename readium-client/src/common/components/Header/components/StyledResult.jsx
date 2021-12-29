import styled from "styled-components";

const StyledResult = styled.div`
  width: 100%;
  height: 45px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 26px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.subtleGrey};
  }
`;

export default StyledResult;

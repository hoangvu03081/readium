import styled from "styled-components";

export const Layout = styled.div`
  margin: 140px auto 0;
  padding-bottom: 100px;
  width: 60%;
  @media (min-width: 1440px) {
    width: 850px;
  }
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 92%;
  }
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  @media (max-width: 575px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
`;
export const Title = styled.p`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 36px;
  margin: 0;
  @media (max-width: 575px) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 400px) {
    font-size: 32px;
  }
`;
export const AddCollectionBtn = styled.button`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 16px;
  padding: 10px 15px;
  border: 2px solid black;
  border-radius: 44px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  i {
    font-size: 20px;
    margin-right: 8px;
  }
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.25s;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
`;

export const ModalContainer = styled.div``;
export const ModalTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;
export const ModalTitle = styled.p`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 20px;
  margin: 0;
`;
export const ModalCloseBtn = styled.button`
  background-color: white;
  border: none;
  font-size: 20px;
  transition: all 0.25s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.25s;
  }
`;
export const ModalBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 13px;
`;
export const ModalInput = styled.input`
  width: 100%;
  border: 2px solid black;
  padding: 5px 10px;
  font-family: "Lato";
  font-weight: 500;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;
export const ModalSubmit = styled.button`
  width: 100%;
  background-color: #e53170;
  color: white;
  border: none;
  padding: 5px 10px;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
export const ModalNote = styled.p`
  margin: 5px auto 0;
  font-family: "Raleway";
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: red;
`;

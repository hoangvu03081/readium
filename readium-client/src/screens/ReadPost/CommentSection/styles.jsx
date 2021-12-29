import styled from "styled-components";

export const Layout = styled.div`
  scroll-margin-top: 100px;
`;

export const Title = styled.p`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 22px;
  margin: 0 0 25px 0;
`;

export const WriteComment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 45px;
`;
export const WriteLeft = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
`;
export const WriteRight = styled.div`
  width: 100%;
  height: fit-content;
  padding: 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 3px;
  border: 1px solid #000000;
  svg {
    font-size: 22px;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: all 0.25s;
    }
  }
`;
export const Input = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  textarea {
    width: 100%;
    height: 45px;
    border: none;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 14px;
    resize: none;
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-input-placeholder {
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
    }
    :-moz-placeholder {
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
    }
    ::-moz-placeholder {
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
    }
    :-ms-input-placeholder {
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
    }
  }
`;

export const ReadComment = styled.div``;
export const Comment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-top: 30px;
`;
export const ReadLeft = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`;
export const ReadRight = styled.div`
  width: 100%;
  height: fit-content;
`;
export const Info = styled.div``;
export const Name = styled.span`
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 14px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;
export const Time = styled.span`
  font-family: "PT Sans";
  font-weight: 500;
  font-size: 12px;
  color: #9c9c9c;
`;
export const Content = styled.p`
  font-family: "PT Sans";
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  white-space: pre-line;
`;

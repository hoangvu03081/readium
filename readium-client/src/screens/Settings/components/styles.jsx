import styled from "styled-components";

export const Header = styled.h2`
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  flex-flow: row wrap;
  justify-content: flex-start;
`;

export const Note = styled.div`
  min-height: 17px;
  margin: 5px 0 2px;
  font-size: 14px;
`;

export const InputLabel = styled.dt`
  margin: 0 0 6px;
  font-weight: bold;
`;

export const Input = styled.input`
  display: inline-block;
  padding: 5px 8px;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  border: 2px solid black;
  outline: none;
  width: ${({ width = "440px" }) => width};
  max-width: 100%;
  font-family: "Raleway", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const TextArea = styled.textarea`
  padding-top: 8px;
  padding-bottom: 8px;
  line-height: 1.5;
  padding: 5px 12px;
  font-size: 14px;
  vertical-align: middle;
  border: 2px solid black;
  outline: none;
  max-width: 100%;
  width: ${({ width = "440px" }) => width};
  height: ${({ height = "108px" }) => height};
`;

export const OutlinedButton = styled.button`
  display: block;
  width: ${({ width = "80px" }) => width};
  height: ${({ height = "35px" }) => height};
  border: 2px solid black;
  text-align: center;
  vertical-align: center;
  font-weight: bold;
  font-size: 16px;
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
  user-select: none;
  appearance: none;
  transition: all 0.2s;

  &:hover {
    background-color: black;
    color: white;
  }
`;

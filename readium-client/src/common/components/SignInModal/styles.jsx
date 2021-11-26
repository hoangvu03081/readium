import styled from "styled-components";

export const Logo = styled.div`
  text-decoration: none;
  font-family: "Publica Sans", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: black;
  padding-top: 10px;
`;

export const Input = styled.input`
  outline: none !important;
  width: 90%;
  height: 40px;
  border-radius: 3px;
  border: 2px solid black;
  padding-left: 10px;
  font-family: "Raleway", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.2s ease;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const LoginButton = styled.button`
  width: 90%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-weight: bold;

  transition: all 0.05s;

  &:active {
    transform: scale(0.99);
  }
`;

export const InputText = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 6px;
  padding-left: 5%;
  font-weight: bold;
`;

export const AllSignInOptions = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;
`;

export const SignInOptionButton = styled.button`
  position: relative;
  outline: none !important;
  width: 85%;
  height: 43px;
  border-radius: 2px;
  border: 2px solid black;
  background-color: white;
  transition: all 0.2s ease;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }

  @media only screen and (max-width: 576px) {
    font-size: 14px;
  }
`;

export const ForgotPassword = styled.span`
  font-weight: bold;
  cursor: pointer;
  color: black;
`;

export const LeadingIcon = styled.i`
  position: absolute;
  top: 8x;
  left: 10px;
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const ClickableText = styled.span`
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
`;

export const LoginText = styled.span`
  display: inline-block;
  font-size: 34px;
  font-weight: bold;
  cursor: pointer;
`;

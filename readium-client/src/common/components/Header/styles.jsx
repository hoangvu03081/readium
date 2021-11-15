import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled(Link)`
  text-decoration: none;
  font-family: "Publica Sans", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: black;
  padding-top: 10px;
`;

export const IconLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  padding-top: 12px;
`;

export const Clickable = styled.div`
  cursor: pointer;
`;

export const Avatar = styled.img`
  margin-top: 5px;
  vertical-align: middle;
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;

export const SearchInput = styled.input`
  &:focus {
    outline: none;
  }
  -webkit-appearance: none;
  margin-top: 5px;
  width: 300px;
  height: 38px;
  border: 2px solid black;
  padding-left: 10px;
  font-family: "Raleway", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const SearchButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 90%;
  border: 1px solid black;
  background-color: white;
  vertical-align: middle;
  padding-top: 5px;
`;

export const SignInButton = styled.button`
  width: 96px;
  height: 30px;
  margin-top: 8px;
  border-radius: 90px;
  border: 2px solid black;
  font-weight: bold;
  background-color: white;
  font-size: 18px;

  cursor: pointer;

  transition: all 0.25s;

  &:hover {
    background-color: black;
    color: white;
  }
`;

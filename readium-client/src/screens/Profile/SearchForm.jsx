import React from "react";
import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import ButtonGroup from "./components/ButtonGroup";
import TagsFilter from "./components/TagsFilter";

const StyledSearchForm = styled.div`
  width: 100%;
  min-width: 330px;
  border: solid black 2px;
  border-radius: 5px;
  padding: 27px;
  position: relative;
`;

const Header = styled.span`
  font-size: 24px;
  font-weight: bold;

  display: inline-block;
  position: relative;
  margin-left: 64px;
  margin-top: 6px;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 16px;
  left: 22px;
`;

const SearchInput = styled.input`
  position: relative;
  height: 40px;
  width: ${(props) => props.width};
  margin-top: ${(props) => props.margin};
  border: solid black 2px;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: ${(props) => props.paddingRight};
  font-family: "Raleway", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const Label = styled.div`
  font-weight: bold;
  margin-left: 7px;
  font-size: 14px;
  margin-bottom: 0;
`;

export default function SearchForm() {
  return (
    <StyledSearchForm>
      <div>
        <SearchIcon>
          <BiSearchAlt2 size={64} />
        </SearchIcon>
        <Header>Search your post</Header>
      </div>
      <SearchInput width="100%" margin="32px" placeholder="Search" />
      <Label className="mt-3 mb-1">Sorting</Label>
      <ButtonGroup className="mb-3" />
      <TagsFilter Label={Label} />
    </StyledSearchForm>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { IoIosAddCircleOutline } from "react-icons/io";

function convertToTag(value) {
  let result = value.replace(/\s/g, "");
  result = result.replace(/#/g, "");
  return `#${result}`;
}

const TagsSection = styled.div`
  display: inline-flex;
  position: relative;
  width: 100%;
  margin-top: 13px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  display: flex;
  position: relative;
  border-radius: 28px;
  height: 28px;
  border: solid black 2px;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  padding-right: 23px;
  margin-right: 12px;
  margin-top: 8px;
`;

const TagButton = styled.button`
  position: absolute;
  cursor: pointer;
  right: 2px;
  bottom: 15%;
  border: none;
  background: none;
  z-index: 2;
`;

const SearchLayout = styled.div`
  position: relative;
  display: inline-flex;
  border: solid black 2px;
  border-radius: 5px;
  height: 40px;
  width: 64%;
`;

const FilterInput = styled.input`
  padding-left: 10px;
  font-family: "Raleway", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

const FilterButton = styled.button`
  position: absolute;
  right: 2px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  top: 3%;

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

// eslint-disable-next-line react/prop-types
export default function TagsFilter({ Label }) {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));
  const onChange = (e) => setInput(e.target.value);
  const submitTag = (e) => {
    if (e && e.type !== "click" && e.key !== "Enter") return;
    if (input !== "") {
      const validTag = convertToTag(input);
      if (tags.includes(validTag)) {
        setInput("");
        return;
      }
      setTags(tags.concat(convertToTag(validTag)));
    }
    setInput("");
  };
  return (
    <>
      <Label className="mt-3 mb-1">Filter by tags</Label>
      <SearchLayout>
        <FilterInput
          onChange={onChange}
          value={input}
          placeholder="Tags"
          onKeyPress={submitTag}
        />
        <FilterButton disabled={input === ""} onClick={submitTag}>
          <IoIosAddCircleOutline size={26} />
        </FilterButton>
      </SearchLayout>
      <TagsSection>
        {tags.map((tag) => (
          <Tag key={tag}>
            {tag}
            <TagButton onClick={() => handleRemoveTag(tag)}>
              <ImCross size={9} />
            </TagButton>
          </Tag>
        ))}
      </TagsSection>
    </>
  );
}

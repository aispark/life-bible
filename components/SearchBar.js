import React from "react";
import PropTypes from "prop-types";
import constants from "@/constants";
import styled from "styled-components";
import { useTheme } from "@/AppContext";

const TextInput = styled.TextInput`
  margin-left: 3px;
  width: ${constants.width - 40}px;
  height: 35px;
  padding: 10px;
  border-radius: 5px;
  color: ${props => props.theme.onSurface}DE;
  background-color: ${prop =>
    prop.theme.name === "light"
      ? prop.theme.greyColor
      : prop.theme.onSurface + "1f"};
  ${prop =>
    prop.theme.name === "light"
      ? "border: 0.5px solid " + prop.theme.darkGreyColor
      : ""};
`;

const SearchBar = ({ onChange, value, onSubmit }) => {
  const theme = useTheme();

  return (
    <TextInput
      returnKeyType="search"
      onChangeText={onChange}
      onEndEditing={onSubmit}
      value={value}
      placeholder={"구절 또는 창(1:1)"}
      placeholderTextColor={theme.onSurface + "61"}
    />
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};
export default SearchBar;

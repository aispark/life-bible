import React from "react";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useTheme } from "@/AppContext";
import styled from "styled-components";

const HighlightText = ({ item, highlightWord, color }) => {
  const theme = useTheme();

  const Text = styled.Text`
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    padding-top: 5px;
    background-color: transparent;
    color: ${props => props.theme.onSurface}DE;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: undefined;
    line-height: 24px;
  `;

  return (
    <Text
      name={name}
      color={focused ? `${theme.onSurface}` : `${theme.onSurface}60`}
      size={size}
    ></Text>
  );
};
HighlightText.propTypes = {
  item: PropTypes.string.isRequired,
  highlightWord: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default HighlightText;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  padding: 10px;
`;

const Text = styled.Text`
  background-color: transparent;
  color: ${props => props.theme.primary};
  font-size: 16px;
  font-weight: normal;
  letter-spacing: undefined;
  line-height: 24px;
  text-align: center;
`;

const CardButton = ({
  text,
  onPress,
  loading = false,
  bgColor = "#22b2b7",
  style = {}
}) => {
  return (
    <Touchable disabled={loading} onPress={onPress}>
      <Container style={{ ...style }}>
        {loading ? (
          <ActivityIndicator color={"white"}></ActivityIndicator>
        ) : (
          <Text>{text}</Text>
        )}
      </Container>
    </Touchable>
  );
};

CardButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  style: PropTypes.object
};

export default CardButton;

import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import RippleComponent from "@/components/Ripple";

const Container = styled.TouchableOpacity`
  flex-direction: row;
`;

const Ripple = styled(RippleComponent)`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  background-color: transparent;
  color: ${props => props.theme.onSurface};
  font-weight: normal;
  letter-spacing: undefined;
`;

export default withNavigation(({ navigation }) => (
  <Ripple onPress={() => console.log("object")}>
    <Title>성경</Title>
  </Ripple>
));

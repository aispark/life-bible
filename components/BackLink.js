import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import NavIcon from "@/components/NavIcon";

const Touchable = styled.TouchableOpacity`
  padding-left: 20px;
`;

export default withNavigation(({ navigation }) => (
  <Touchable onPress={() => navigation.goBack(null)}>
    <NavIcon name={"ios-arrow-round-back"} />
  </Touchable>
));

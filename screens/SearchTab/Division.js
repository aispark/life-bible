import React from "react";
import styled from "styled-components";
import { useTheme, useHandleTheme } from "@/AppContext";
import Ripple from "@/components/Ripple";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Text = styled.Text``;

export default () => {
  const theme = useTheme();
  const handleTheme = useHandleTheme();
  return (
    <View style={{ backgroundColor: `${theme.background}` }}>
      <Ripple style={{ marginBottom: 20 }} onPress={() => handleTheme("light")}>
        <Text style={{ color: `${theme.primary}` }}>장</Text>
      </Ripple>
    </View>
  );
};

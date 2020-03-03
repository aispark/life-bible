import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { TouchableRipple } from "react-native-paper";
import MaterialRipple from "react-native-material-ripple";
import { useTheme } from "@/AppContext";

const Ripple = ({ onPress, rippleColor, style, children }) => {
  const theme = useTheme();
  // rippleColor = rippleColor || theme.onSurface + "1A";
  rippleColor = rippleColor || theme.onSurface;
  const styles = StyleSheet.create(style);

  return (
    <MaterialRipple
      onPress={onPress}
      rippleColor={rippleColor}
      rippleOpacity={0.1}
      rippleDuration={200}
      rippleFades={false}
      style={styles}
    >
      {children}
    </MaterialRipple>
  );
};

Ripple.propTypes = {
  onPress: PropTypes.func.isRequired,
  rippleColor: PropTypes.string
};
export default Ripple;

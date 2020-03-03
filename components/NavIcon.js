import React from "react";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useTheme } from "@/AppContext";

const NavIcon = ({
  focused = true,
  name,
  color = "#000000",
  size = 28,
  type = "Ionicons"
}) => {
  const theme = useTheme();

  const Components = {
    Ionicons,
    MaterialIcons,
    AntDesign,
    MaterialCommunityIcons
  };

  const IconComponent = Components[type];

  return (
    <IconComponent
      name={name}
      color={focused ? `${theme.onSurface}` : `${theme.onSurface}60`}
      size={size}
    />
  );
};
NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
  category: PropTypes.string
};

export default NavIcon;

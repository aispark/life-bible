import { useTheme } from "@/AppContext";

const Title = () => {
  const theme = useTheme();
  return {
    backgroundColor: transparent,
    color: `${theme.onSurface}DE`,
    fontSize: "16px",
    fontWeight: normal,
    letterSpacing: undefined,
    lineHeight: "24px"
  };
};

export default { Title };

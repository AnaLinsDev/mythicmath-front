import { useTheme } from "@/hooks/useTheme";
import { View, Text } from "react-native";

const register = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>register</Text>
    </View>
  );
};

export default register;

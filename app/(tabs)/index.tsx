import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
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
      <Text style={{ color: theme.foreground }}>
        Hello Theme
      </Text>
    </View>
  );
}
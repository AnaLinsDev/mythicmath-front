import { View, Button } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function Login() {
  const { theme } = useTheme();
  function handleLogin() {
    router.replace("/(tabs)");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

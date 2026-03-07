import { View, Button } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function Profile() {
  const { theme } = useTheme();
  function handleLogout() {
    router.replace("/(auth)/login");
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
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

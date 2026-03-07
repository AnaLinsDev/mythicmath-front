import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import CardAuth from "@/components/CardAuth";
import { router } from "expo-router";import { useTheme } from "@/hooks/useTheme";
import ButtonGradient from "@/components/ButtonGradient";
import { ButtonLink } from "@/components/ButtonLink";

export default function LoginScreen() {
  const { theme } = useTheme();

  function handleLogin() {
    router.replace("/(tabs)");
  }

  return (
    <LinearGradient
      colors={theme.backgroundAuthClearer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <CardAuth>
          <ButtonGradient title="Login" onPress={handleLogin} />
          <ButtonLink
            title="Não tem conta? Cadastre-se"
            href="/register"
          />
        </CardAuth>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
});

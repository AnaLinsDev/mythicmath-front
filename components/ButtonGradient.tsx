import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function ButtonGradient({ title, onPress, disabled }: Props) {
  const { theme } = useTheme();
  
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={
            pressed
              ? theme.backgroundAuthDarker 
              : theme.backgroundAuthClearer
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  gradient: {
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },

  pressed: {
    opacity: 0.9,
  },

  disabled: {
    opacity: 0.5,
  },
});

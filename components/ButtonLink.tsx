import { Pressable, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Href, Link } from "expo-router";

type Props = {
  title: string;
  href: Href;
};

export function ButtonLink({ title, href }: Props) {
  const { theme } = useTheme();

  return (
    <Link href={href} asChild>
      <Pressable
        style={{
          backgroundColor: theme.background,
          padding: 4,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme.purple,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      </Pressable>
    </Link>
  );
}

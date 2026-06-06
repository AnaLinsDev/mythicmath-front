export const avatars = {
  "app-avatar:vampire": require("@/assets/avatars/vampire.jpg"),
  "app-avatar:dragon": require("@/assets/avatars/dragon.jpg"),
  "app-avatar:dwarf": require("@/assets/avatars/dwarf.jpg"),
  "app-avatar:mage": require("@/assets/avatars/mage.jpg"),
  "app-avatar:elf": require("@/assets/avatars/elf.jpg"),
  "app-avatar:mermaid": require("@/assets/avatars/mermaid.jpg"),
  "app-avatar:necromancer": require("@/assets/avatars/necromancer.jpg"),
  "app-avatar:angelic_paladin": require("@/assets/avatars/angelic_paladin.jpg"),
  "app-avatar:phoenix": require("@/assets/avatars/phoenix.jpg"),
} as const;

export type AvatarKey = keyof typeof avatars;
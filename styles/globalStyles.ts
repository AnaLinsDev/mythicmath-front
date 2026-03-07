// globalStyles.ts

import { StyleSheet } from "react-native";

export const globalStyles = (theme: any) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      padding: 14,
      borderRadius: 10,
    },

    error: {
      color: theme.error,
      fontSize: 12,
    },

    title: {
      fontSize: 40,
      fontWeight: 700,
      color: theme.secondary,
      marginBottom: 10,
    },

    message: {
      color: theme.secondary,
      fontSize: 16,
      marginBottom: 40,
    },

    message_bottom: {
      color: theme.secondary,
      fontSize: 16,
      marginTop: 40,
    },


  });

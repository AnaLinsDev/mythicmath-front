import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ButtonLink } from "@/components/ButtonLink";
import ButtonGradient from "@/components/ButtonGradient";
import CardAuth from "@/components/CardAuth";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

// React Hook Form controla os campos do formulário com alta performance
import { useForm, Controller } from "react-hook-form";

// Zod é usado para criar um schema de validação
import { z } from "zod";

// Permite conectar Zod com React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { globalStyles } from "@/styles/globalStyles";
import { register } from "@/src/services/authService";

/*
  Aqui criamos o schema de validação do formulário.
  Todo dado submetido será validado com essas regras.
*/
const registerSchema = z
  .object({
    // name deve existir e ter pelo menos 1 caractere
    name: z.string().min(1, "O nome é obrigatório"),

    // email precisa ter formato válido
    email: z.string().email("Digite um e-mail válido"),

    // password precisa ter pelo menos 6 caracteres
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),

    // confirmPassword será comparado depois
    confirmPassword: z.string(),
  })
  /*
    refine permite criar validações personalizadas.
    Aqui verificamos se password === confirmPassword
  */
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // erro aparecerá nesse campo
  });

/*
  infer permite criar automaticamente o tipo TypeScript
  baseado no schema Zod.
*/
type FormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const { theme } = useTheme();
  const globalTheme = globalStyles(theme);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  /*
    useForm inicializa o formulário.

    resolver: conecta o Zod ao React Hook Form.
    Ou seja: quando o formulário for submetido,
    o Zod fará toda a validação automaticamente.
  */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /*
    Essa função só será executada se TODAS
    as validações do schema passarem.
  */
  async function handleRegister(data: FormData) {
    try {
      await register(data);
      alert("Registrado!");
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      const message =
        error?.response?.data?.detail || error?.message || "Erro ao registrar";

      alert(message);
    }
  }

  return (
    <LinearGradient
      colors={theme.backgroundAuthClearer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo_transparent.png")}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />

        <Text style={globalTheme.title}>Criar Conta</Text>
        <Text style={globalTheme.message}>
          Comece sua jornada matemática agora
        </Text>

        <CardAuth>
          {/* 
            Controller conecta um input do React Native
            com o sistema do React Hook Form.

            Isso é necessário porque TextInput é
            um componente controlado.
          */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Nome*"
                  // value vem do React Hook Form
                  value={value}
                  // qualquer alteração atualiza o estado interno do formulário
                  onChangeText={onChange}
                  // usado apenas para estilização
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    { borderColor: theme.border, color: theme.text },
                    focusedInput === "name" && styles.focused,
                  ]}
                  placeholderTextColor={theme.textSecondary}
                />

                {/* 
                  errors é gerado automaticamente pelo React Hook Form
                  baseado no schema do Zod.
                  
                  Se existir erro no campo name,
                  mostramos o texto abaixo do input.
                */}
                {errors.name && (
                  <Text style={[styles.error, { color: theme.error }]}>
                    {errors.name.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* EMAIL */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Email*"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    { borderColor: theme.border, color: theme.text },
                    focusedInput === "email" && styles.focused,
                  ]}
                  placeholderTextColor={theme.textSecondary}
                />

                {/* erro de email inválido */}
                {errors.email && (
                  <Text style={[styles.error, { color: theme.error }]}>
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Senha*"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    { borderColor: theme.border, color: theme.text },
                    focusedInput === "password" && styles.focused,
                  ]}
                  placeholderTextColor={theme.textSecondary}
                />

                {/* erro se senha < 6 caracteres */}
                {errors.password && (
                  <Text style={[styles.error, { color: theme.error }]}>
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* CONFIRM PASSWORD */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Confirme a Senha*"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    { borderColor: theme.border, color: theme.text },
                    focusedInput === "confirmPassword" && styles.focused,
                  ]}
                  placeholderTextColor={theme.textSecondary}
                />

                {/* erro se senhas não coincidirem */}
                {errors.confirmPassword && (
                  <Text style={[styles.error, { color: theme.error }]}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* 
            handleSubmit executa:
            1- validação do Zod
            2- se válido → chama handleRegister
            3- se inválido → preenche errors automaticamente
          */}
          <ButtonGradient
            title="Cadastre-se"
            onPress={handleSubmit(handleRegister)}
          />

          <ButtonLink title="Já tem conta? Entre aqui" href="/login" />
        </CardAuth>

        <View style={styles.messageRow}>
          <Text style={globalTheme.message_bottom}>
            ✨ Comece do nível 1 e evolua até o topo!
          </Text>
        </View>
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
    alignItems: "center",
    padding: 24,
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },

  // estilo aplicado quando o input está focado
  focused: {
    borderWidth: 2,
  },

  // estilo da mensagem de erro
  error: {
    fontSize: 12,
    marginTop: -10,
    marginBottom: 4,
  },
});

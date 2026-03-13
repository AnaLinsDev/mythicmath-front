import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterRequest, AuthResponse, LoginRequest } from "../../types/auth";
import { TOKEN_KEY } from "../constants/auth.constants";

// ENDPOINTS __________

// Get current token
export const getToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

// Register new user
export const register = (data: RegisterRequest) =>
  authenticate("/register", data);

// Login
export const login = (data: LoginRequest) => authenticate("/login", data);

// Logout
export const logout = async (): Promise<void> => {
  try {
    await api.post("/logout");
  } finally {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
};

// HELPER __________

const authenticate = async (
  endpoint: string,
  data: RegisterRequest | LoginRequest,
): Promise<string> => {
  const response = await api.post<AuthResponse>(endpoint, data);
  const token = response.data.token;
  await AsyncStorage.setItem(TOKEN_KEY, token);

  return token;
};

import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterRequest, AuthResponse, LoginRequest } from "../../types/auth";
import { TOKEN_KEY } from "../constants/auth.constants";
import { ApiEndpoints } from "../constants/api.endpoints";

// ENDPOINTS __________

// Register
export const register = (data: RegisterRequest) =>
  authenticate(ApiEndpoints.REGISTER, data);

// Login
export const login = (data: LoginRequest) =>
  authenticate(ApiEndpoints.LOGIN, data);

// Logout
export const logout = async (): Promise<void> => {
  try {
    const token = await getToken();
    if (!(token == null)) {
      await api.post(ApiEndpoints.LOGOUT, { token });
    }
  } finally {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
};

// HELPER __________

export const getToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

const authenticate = async (
  endpoint: string,
  data: RegisterRequest | LoginRequest,
): Promise<string> => {
  const response = await api.post<AuthResponse>(endpoint, data);
  const token = response.data.token;
  await AsyncStorage.setItem(TOKEN_KEY, token);

  return token;
};

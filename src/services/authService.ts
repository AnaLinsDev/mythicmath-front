import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterRequest, AuthResponse, LoginRequest } from "../../types/auth";

const TOKEN_KEY = "auth_token";

export const register = async (data: RegisterRequest): Promise<string> => {  
  const response = await api.post<AuthResponse>("/register", data);

  const token = response.data.token;

  await AsyncStorage.setItem(TOKEN_KEY, token);

  return token;
};

export const login = async (data: LoginRequest): Promise<string> => {  
  const response = await api.post<AuthResponse>("/register", data);

  const token = response.data.token;

  await AsyncStorage.setItem(TOKEN_KEY, token);

  return token;
};

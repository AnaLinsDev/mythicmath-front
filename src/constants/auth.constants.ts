import { ApiEndpoints } from "./api.endpoints";

export const TOKEN_KEY = "auth_token";

export const PUBLIC_ROUTES = [
  ApiEndpoints.LOGIN,
  ApiEndpoints.REGISTER,
  ApiEndpoints.HEALTH,
];

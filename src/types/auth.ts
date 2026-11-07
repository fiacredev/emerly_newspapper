import type { UserRole, AdminUser } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
  };
}

export interface ProfileResponse {
  success: boolean;
  data: AdminUser & {
    _id: string;
  };
}

export interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<UserRole>;
  logout: () => void;
}
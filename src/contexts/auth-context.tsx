"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiRequest, getToken, removeToken, saveToken } from "@/lib/api";

import type {
  AuthContextType,
  LoginCredentials,
  LoginResponse,
  ProfileResponse,
} from "../../src/types/auth";

import type { AdminUser } from "../../src/types/user";

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    const storedToken = getToken();

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);

    try {
      const response = await apiRequest<ProfileResponse>(
        "/auth/me",
        { auth: true }
      );

      const profile = response.data;

      setUser({
        ...profile,
        _id: profile._id,
      });
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);



  const login = async (
  credentials: LoginCredentials
): Promise<"admin" | "journalist"> => {
  const response = await apiRequest<LoginResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(credentials),
    }
  );

  saveToken(response.data.token);
  setToken(response.data.token);

  try {
    const profile = await apiRequest<ProfileResponse>(
      "/auth/me",
      { auth: true }
    );

    setUser({
      ...profile.data,
      _id: profile.data._id,
    });

    return profile.data.role;
  } catch (error) {
    logout();
    throw error;
  }
};



  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
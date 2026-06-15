import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";
import type { User, AuthResponse, LoginRequest, RegisterRequest } from "../types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
  clearError: () => void;
  setAuth: (response: AuthResponse) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setAuth: (response: AuthResponse) => {
    // SECURITY NOTE: Refresh token stored in localStorage because we can't set httpOnly
    // cookies from a SPA (that requires server-side Set-Cookie headers).
    // In production, the backend should set the refresh token as an httpOnly cookie
    // to protect against XSS. localStorage is vulnerable to XSS attacks.
    localStorage.setItem("refreshToken", response.refreshToken);

    set({
      user: response.user,
      accessToken: response.accessToken,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  login: async (data: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post<AuthResponse>("/auth/login", data);
      get().setAuth(res.data);
    } catch (err: any) {
      const message =
        err.response?.data?.error || "Login failed. Please try again.";
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  register: async (data: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post<AuthResponse>("/auth/register", data);
      get().setAuth(res.data);
    } catch (err: any) {
      const message =
        err.response?.data?.error || "Registration failed. Please try again.";
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
      // Ignore errors on logout — clear local state regardless
    } finally {
      localStorage.removeItem("refreshToken");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
      const res = await api.post<AuthResponse>("/auth/refresh", {
        refreshToken,
      });
      get().setAuth(res.data);
      return res.data.accessToken;
    } catch {
      // Refresh failed — force logout
      localStorage.removeItem("refreshToken");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
      });
      return null;
    }
  },

  clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

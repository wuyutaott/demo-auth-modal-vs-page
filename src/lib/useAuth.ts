"use client";

import { useState } from "react";
import { apiLogin, saveTokens } from "./authService";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const tokens = await apiLogin(email, password);
      saveTokens(tokens);
      return true;
    } catch (e: any) {
      setError(e?.message || "登录失败");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}

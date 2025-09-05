import Cookies from "js-cookie";

export async function apiLogin(email: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "LOGIN_FAILED");
  }

  return (await res.json()) as { accessToken: string; user?: any };
}

export function saveTokens(tokens: { accessToken: string }) {
  // demo：简单把 token 存 Cookie；生产建议 HttpOnly Cookie（在后端设置）
  Cookies.set("access_token", tokens.accessToken, { sameSite: "lax" });
}

export function clearTokens() {
  Cookies.remove("access_token");
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pwd }),
      });
      if (!res.ok) throw new Error(await res.text());
      // 服务端已设置 HttpOnly 会话 cookie，前端无须保存 token
      router.replace(returnTo);
    } catch (e: any) {
      setErr(e?.message || "登录失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        placeholder="邮箱"
        className="w-full rounded border px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="密码（demo: pass123）"
        className="w-full rounded border px-3 py-2"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button className="w-full rounded-md bg-black text-white py-2" disabled={loading}>
        {loading ? "登录中…" : "登录"}
      </button>
    </form>
  );
}

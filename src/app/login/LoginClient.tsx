"use client";

import { useSearchParams } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginClient() {
  const sp = useSearchParams();
  const returnTo = sp.get("return_to") || "/";

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">登录</h1>
        <AuthForm returnTo={returnTo} />
      </div>
    </main>
  );
}

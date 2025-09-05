"use client";

import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">demo-auth-modal-vs-page</h1>
        <p className="text-gray-600">
          这是首页示例。点击下面的按钮打开 <b>登录弹窗</b>；或访问 <code>/login</code> 体验 <b>独立登录页</b>。
        </p>
        <button
          className="rounded-md bg-black text-white px-4 py-2"
          onClick={() => setOpen(true)}
        >
          打开登录弹窗
        </button>
        <p className="text-sm text-gray-500">
          弹窗与登录页共用同一套表单（AuthForm）。
        </p>
      </div>

      <AuthModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}

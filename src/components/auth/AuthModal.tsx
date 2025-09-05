"use client";

import { AuthForm } from "./AuthForm";
import { useSearchParams } from "next/navigation";
import { getReturnTo } from "@/lib/returnTo";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const searchParams = useSearchParams();
  const returnTo = getReturnTo(
    new URLSearchParams(searchParams?.toString() || "")
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">登录</h2>
          <button aria-label="关闭" onClick={onClose}>
            ×
          </button>
        </div>
        <AuthForm returnTo={returnTo} />
        <p className="mt-3 text-xs text-gray-500">
          这是登录弹窗。密码输入 <code>pass123</code> 将模拟登录成功。
        </p>
      </div>
    </div>
  );
}

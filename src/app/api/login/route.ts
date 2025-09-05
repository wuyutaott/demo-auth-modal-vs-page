import { NextResponse } from "next/server";

// TODO: 换成真实校验（查库/比对密码哈希/风控）
async function verify(email: string, password: string) {
  return password === "pass123" ? { userId: "u_1", role: "user" } : null;
}

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) {
    return new NextResponse("INVALID_PARAMS", { status: 400 });
  }

  const user = await verify(email, password);
  if (!user) return new NextResponse("INVALID_CREDENTIALS", { status: 401 });

  // 生成你的会话令牌（建议 JWT 或 sessionId 服务器存储）
  const sessionToken = `sess_${user.userId}_${Date.now()}`;

  const res = NextResponse.json({ ok: true });
  // 在服务端设置 HttpOnly Cookie —— 更安全
  res.cookies.set("session", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,         // 生产环境一定要 true（HTTPS）
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7d
  });
  return res;
}

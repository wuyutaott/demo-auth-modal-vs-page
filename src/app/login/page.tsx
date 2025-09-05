// app/login/page.tsx  —— Server Component（默认）
import LoginClient from "./LoginClient";

export default function LoginPage() {
  // 不直接读取 searchParams，避免触发动态 API 警告
  return <LoginClient />; // 交给客户端子组件处理交互和查询串
}

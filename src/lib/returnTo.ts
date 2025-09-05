export function getReturnTo(searchParams: URLSearchParams) {
	const rt = searchParams.get("return_to");
	// 简单防开放重定向：只允许站内路径
	if (rt && rt.startsWith("/")) return rt;
	return "/";
}
  
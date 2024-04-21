import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BACKEND_URL } from "@/utils/commonConst";

async function fetchUser(accessToken: String) {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/verify-access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
      credentials: "include",
    });

    return res.json()
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    // throw error; // Chuyển tiếp lỗi để xử lý ở phía gọi hàm
  }
}

export async function middleware(request: NextRequest) {
  const accessTokenString = request.cookies.get("accessToken");

  if (
    !accessTokenString &&
    (request.url.includes("/login") || request.url.includes("/register"))
  ) {
    return NextResponse.next();
  } else if (accessTokenString && request.url.includes("/logout")) {
    return NextResponse.next();
  } else if (accessTokenString) {
    const res = await fetchUser(accessTokenString.value);
    console.log(res)
    if (res.status !== 200 && res.success == true) {
      console.log("Fake AccessToken !!!");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.headers.set(
        "Set-Cookie",
        `currentUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; HttpOnly`
      );
      response.headers.set(
        "Set-Cookie",
        `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; HttpOnly`
      );
      return response;
    }
    return NextResponse.next();
  }

  // Nếu không có token hoặc giải mã thất bại, chuyển hướng đến trang đăng nhập
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher:
    "/(account/.*|cart|notifications|order-information|login|register|logout)",
};

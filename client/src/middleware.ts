import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BACKEND_URL } from "@/utils/commonConst";

async function fetchUser(accessToken: String) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/verify-access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const userData = await response.json();
    // Use the user data as needed in your frontend application
    return userData;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error; // Chuyển tiếp lỗi để xử lý ở phía gọi hàm
  }
}

export async function middleware(request: NextRequest) {
  let accessTokenString = request.cookies.get("accessToken");

  if (
    !accessTokenString &&
    (request.url.includes("/login") || request.url.includes("/register"))
  ) {
    return NextResponse.next();
  } else if (accessTokenString && request.url.includes("/logout")) {
    return NextResponse.next();
  } else if (accessTokenString) {
    const user = await fetchUser(accessTokenString.value);
    if (!user) {
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

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/api/auth/signIn",
    "/api/auth/signOut",
    "/api/token/refresh",
    "/api/password/restorePassword",
    "/api/qr/getItem",
    "/api/users/createUser"
  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, message: "No autorizado" },
      { status: 401 },
    );
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Token inválido" },
      { status: 401 },
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};

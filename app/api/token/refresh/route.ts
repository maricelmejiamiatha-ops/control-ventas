import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "@/app/config/jwt.config";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      refreshToken,
      JWT_CONFIG.refreshSecret
    ) as { idUser: number };

    const newAccessToken = jwt.sign(
      { idUser: decoded.idUser },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.accessExpiresIn }
    );

    return NextResponse.json({
      success: true,
      token: newAccessToken,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired refresh token" },
      { status: 403 }
    );
  }
}
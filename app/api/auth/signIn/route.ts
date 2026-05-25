import { NextResponse } from "next/server";
import { comparePassword } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "@/app/config/jwt.config";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        emailUser: data.emailUser,
      },
      select: {
        idUser: true,
        fullNameUser: true,
        nitUser: true,
        numberPhoneUser: true,
        codeUser: true,
        emailUser: true,
        passwordUser: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Usuario no existe" },
        { status: 404 },
      );
    }

    const isValid = await comparePassword(data.passwordUser, user.passwordUser);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Contraseña incorrecta" },
        { status: 400 },
      );
    }

    const dataUser = {
      fullNameUser: user.fullNameUser,
      nitUser: user.nitUser,
      numberPhoneUser: user.numberPhoneUser,
      codeUser: user.codeUser,
      emailUser: user.emailUser,
    };

    const token = jwt.sign({ idUser: user.idUser }, JWT_CONFIG.secret, {
      expiresIn: JWT_CONFIG.accessExpiresIn,
    });

    const refreshToken = jwt.sign(
      { idUser: user.idUser },
      JWT_CONFIG.refreshSecret,
      { expiresIn: JWT_CONFIG.refreshExpiresIn },
    );

    const response = NextResponse.json({
      success: true,
      token,
      user: dataUser,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

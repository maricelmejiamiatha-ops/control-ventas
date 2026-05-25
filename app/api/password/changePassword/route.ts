import { NextResponse } from "next/server";
import { comparePassword, hashPassword } from "@/app/helpers";
import { getInfoUserFromToken } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userInfo = await getInfoUserFromToken(request);

    const user = await prisma.user.findUnique({
      where: {
        idUser: userInfo.idUser,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no existe" }, { status: 404 });
    }

    const isValid = await comparePassword(
      data.currentPassword,
      user.passwordUser,
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(data.newPassword);

    await prisma.user.update({
      where: {
        idUser: userInfo.idUser,
      },
      data: {
        passwordUser: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contraseña actualizada con exito",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error en el servidor",
      },
      { status: 500 },
    );
  }
}

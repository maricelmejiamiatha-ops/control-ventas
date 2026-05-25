import { NextResponse } from "next/server";
import { hashPassword, generatePassword } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        idUser: data.idUser,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuario no existe",
        },
        { status: 404 },
      );
    }

    const password = generatePassword();
    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: {
        idUser: data.idUser,
      },
      data: {
        passwordUser: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contraseña actualizada",
        results: password,
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

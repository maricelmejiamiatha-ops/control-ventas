import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const existUser = await prisma.client.findFirst({
      where: {
        ciClient: data.ciClient,
      },
    });

    if (existUser) {
      return NextResponse.json(
        { success: false, message: "CI actualmente en uso" },
        { status: 404 },
      );
    }

    const infoUser = await prisma.client.create({
      data: {
        nameClient: data.nameClient,
        ciClient: data.ciClient,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Cliente creado exitosamente",
        results: infoUser,
      },
      {
        status: 201,
      },
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

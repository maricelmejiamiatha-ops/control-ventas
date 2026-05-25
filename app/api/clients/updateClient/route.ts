import { NextResponse } from "next/server";
import { getOneUserById } from "@/app/services/clients.services";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const existUser = await getOneUserById(data.idClient);
    
    if (!existUser) {
      return NextResponse.json(
        { success: false, message: "Cliente no encontrado" },
        { status: 404 },
      );
    }

    await prisma.client.update({
      where: {
        idClient: data.idClient,
      },
      data: {
        nameClient: data.nameClient,
        ciClient: data.ciClient,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Cliente actualizado correctamente",
        results: await getOneUserById(data.idClient),
      },
      { status: 201 },
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

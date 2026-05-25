import { NextResponse } from "next/server";
import { getOneUserById } from "@/app/services/clients.services";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dataClient = await getOneUserById(data.idClient);

    if (!dataClient) {
      return NextResponse.json(
        { success: false, message: "Cliente no encontrado" },
        { status: 404 },
      );
    }

    const clientSales = await prisma.detail.count({
      where: {
        idClient: data.idClient,
      },
    });

    if (clientSales > 0) {
      return NextResponse.json(
        { success: false, message: "El cliente cuenta con ventas" },
        { status: 404 },
      );
    }

    const clientHistory = await prisma.listDetail.count({
      where: {
        idDetail: data.idDetail,
      },
    });

    if (clientHistory > 0) {
      return NextResponse.json(
        { success: false, message: "No se puede eliminar a este cliente" },
        { status: 404 },
      );
    }

    await prisma.client.delete({
      where: {
        idClient: dataClient.idClient,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Cliente eliminado correctamente",
        results: dataClient,
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

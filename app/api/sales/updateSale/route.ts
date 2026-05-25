import { NextResponse } from "next/server";
import { getDetailById } from "@/app/services/sales.services";
import { getInfoUserFromToken } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";
import { getOneUserById } from "@/app/services/clients.services";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const userInfo = await getInfoUserFromToken(request);
    const detailSale = await getDetailById(data.idDetail, userInfo.idUser);

    if (!detailSale) {
      return NextResponse.json(
        { success: false, message: "Venta no encontrada" },
        { status: 404 },
      );
    }

    await prisma.detail.update({
      where: {
        idDetail: data.idDetail,
      },
      data: {
        idDetail: data.idDetail,
        idUser: userInfo.idUser,
        idClient: data.idClient,
        dateDetail: new Date(data.dateDetail),
        total: data.total,
      },
    });

    const infoClient = await getOneUserById(data.idClient);
    const infoDetailByID = await getDetailById(data.idDetail, userInfo.idUser);

    if (!infoDetailByID || Array.isArray(infoDetailByID)) {
      return NextResponse.json(
        { success: false, message: "Venta no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Venta modificada correctamente",
        results: {
          idDetail: infoDetailByID.idDetail,
          dateDetail: infoDetailByID.dateDetail,
          total: infoDetailByID.total,
          infoClient,
        },
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

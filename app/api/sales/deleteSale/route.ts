import { NextResponse } from "next/server";
import { getDetailById } from "@/app/services/sales.services";
import { getInfoUserFromToken } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
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

    const numberItems = await prisma.listDetail.count({
      where: {
        idDetail: data.idDetail,
      },
    });

    if (numberItems > 0) {
      return NextResponse.json(
        { success: false, message: "La venta no se puede eliminar" },
        { status: 404 },
      );
    }

    await prisma.detail.delete({
      where: {
        idDetail: data.idDetail,
        idUser: userInfo.idUser,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Venta eliminada correctamente",
        results: detailSale,
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

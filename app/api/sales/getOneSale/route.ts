import { NextResponse } from "next/server";
import { getDetailById } from "@/app/services/sales.services";
import { getInfoUserFromToken } from "@/app/helpers";

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

    return NextResponse.json(
      {
        success: true,
        message: "Venta obtenida correctamente",
        results: detailSale,
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

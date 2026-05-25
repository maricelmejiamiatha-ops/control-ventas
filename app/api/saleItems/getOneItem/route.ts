import { NextResponse } from "next/server";
import { existItem } from "@/app/services/saleItems.services";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const itemDetail = await existItem(data.listDetail, data.idDetail);

    if (!itemDetail) {
      return NextResponse.json(
        { success: false, message: "Item no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Item obtenido correctamente",
        results: itemDetail,
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

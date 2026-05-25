import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma.libs";
import { existItem } from "@/app/services/saleItems.services";
import { calculateSubtotal } from "@/app/services/sales.services";
import { getInfoUserFromToken } from "@/app/helpers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userInfo = await getInfoUserFromToken(request);

    if (!(await existItem(data.idListDetail, data.idDetail))) {
      return NextResponse.json(
        { success: false, message: "Item no encontrado" },
        { status: 404 },
      );
    }

    const itemData = await prisma.listDetail.delete({
      where: {
        idListDetail: data.idListDetail,
        idDetail: data.idDetail,
      },
    });

    await calculateSubtotal(data.idDetail, userInfo.idUser);

    return NextResponse.json(
      {
        success: true,
        message: "Item eliminado correctamente",
        results: {
          idDetail: itemData.idDetail,
          idListDetail: itemData.idListDetail,
          codeService: itemData.codeService,
          amount: itemData.amount,
          unitMeasurement: itemData.unitMeasurement,
          descriptionDetail: itemData.descriptionDetail,
          unitPrice: itemData.unitPrice,
          discount: itemData.discount,
          subTotal: itemData.subTotal,
        },
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

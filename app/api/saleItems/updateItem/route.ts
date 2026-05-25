import { NextResponse } from "next/server";
import { calculateSubTotal, getInfoUserFromToken } from "@/app/helpers";
import { existItem } from "@/app/services/saleItems.services";
import prisma from "@/app/libs/prisma.libs";
import { calculateSubtotal } from "@/app/services/sales.services";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const userInfo = await getInfoUserFromToken(request);

    if (!(await existItem(data.idListDetail, data.idDetail))) {
      return NextResponse.json(
        { success: false, message: "Item no encontrado" },
        { status: 404 },
      );
    }

    const amount = Number(data.amount);
    const unitPrice = Number(data.unitPrice);
    const discount = Number(data.discount) || 0;

    const subTotal = calculateSubTotal(amount, unitPrice, discount);

    const itemData = await prisma.listDetail.update({
      where: {
        idDetail: data.idDetail,
        idListDetail: data.idListDetail,
      },
      data: {
        codeService: data.codeService,
        amount,
        unitMeasurement: data.unitMeasurement,
        descriptionDetail: data.descriptionDetail,
        unitPrice,
        discount,
        subTotal,
      },
    });

    await calculateSubtotal(data.idDetail, userInfo.idUser);

    return NextResponse.json(
      {
        success: true,
        message: "Item modificado correctamente",
        results: itemData,
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

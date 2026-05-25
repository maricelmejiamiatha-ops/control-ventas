import { NextResponse } from "next/server";
import { calculateSubTotal, getInfoUserFromToken } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";
import { calculateSubtotal } from "@/app/services/sales.services";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userInfo = await getInfoUserFromToken(request);

    const codeExist = await prisma.listDetail.findFirst({
      where: {
        codeService: data.codeService,
      },
    });

    if (codeExist) {
      return NextResponse.json(
        { success: false, message: "Codigo ya existente" },
        { status: 404 },
      );
    }

    const amount = Number(data.amount);
    const unitPrice = Number(data.unitPrice);
    const discount = Number(data.discount) || 0;

    const subTotal = calculateSubTotal(amount, unitPrice, discount);

    const results = await prisma.listDetail.create({
      data: {
        idDetail: Number(data.idDetail),
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
        message: "Item añadido correctamente",
        results,
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

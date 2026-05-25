import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma.libs";
import { getDetailDate } from "@/app/services/saleItems.services";
import { getUserByID } from "@/app/services/user.services";
import { getOneUserById } from "@/app/services/clients.services";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const existSale = await prisma.detail.findUnique({
      where: {
        idDetail: body.idDetail,
      },
      select: {
        idUser: true,
        idClient: true,
        cufCode: true,
      },
    });

    if (!existSale) {
      return NextResponse.json(
        { success: false, message: "Venta no encontrada" },
        { status: 404 },
      );
    }

    const listItems = await prisma.listDetail.findMany({
      where: {
        idDetail: body.idDetail,
      },
      orderBy: {
        idListDetail: "asc",
      },
      select: {
        idDetail: true,
        idListDetail: true,
        codeService: true,
        amount: true,
        unitMeasurement: true,
        descriptionDetail: true,
        unitPrice: true,
        discount: true,
        subTotal: true,
      },
    });

    const listPrices = await prisma.listDetail.findMany({
      where: {
        idDetail: body.idDetail,
      },
      select: {
        subTotal: true,
      },
    });

    let subTotal = 0;
    for (const key in listPrices) {
      subTotal += listPrices[key].subTotal;
    }

    const client = await getOneUserById(existSale.idClient);

    if (!client) {
      return NextResponse.json(
        { success: false, message: "Cliente no registrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Venta obtenida correctamente",
        info: {
          subTotal,
          cufCode: existSale.cufCode,
          date: await getDetailDate(body.idDetail),
          user: await getUserByID(existSale.idUser),
          client: {
            nameClient: client.nameClient,
            ciClient: client.ciClient,
          },
        },
        results: listItems,
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

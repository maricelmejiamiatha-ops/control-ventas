import { NextResponse } from "next/server";
import {
  getInfoUserFromToken,
  getPagination,
  getPaginationInfo,
} from "@/app/helpers";
import { PAGINATION_LIMIT } from "@/app/config/pagination.config";
import prisma from "@/app/libs/prisma.libs";
import {
  getDetailDate,
  listDetailsSubTotal,
} from "@/app/services/saleItems.services";
import { getOneUserById } from "@/app/services/clients.services";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userInfo = await getInfoUserFromToken(request);
    const { page, take, skip } = getPagination(body.page, PAGINATION_LIMIT);

    const total = await prisma.listDetail.count({
      where: {
        idDetail: body.idDetail,
        detail: {
          idUser: userInfo.idUser,
        },
      },
    });

    const listSales = await prisma.listDetail.findMany({
      where: {
        idDetail: body.idDetail,
        detail: {
          idUser: userInfo.idUser,
        },
      },
      orderBy: {
        idListDetail: "asc",
      },
      skip,
      take,
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

    const existSale = await prisma.detail.findUnique({
      where: {
        idDetail: body.idDetail,
      },
      select: {
        cufCode: true,
        idClient: true,
      },
    });

    const info = getPaginationInfo(total, page, take);

    return NextResponse.json(
      {
        success: true,
        message: "Lista de items",
        info,
        date: await getDetailDate(body.idDetail),
        cufCode: existSale!.cufCode,
        subTotal: await listDetailsSubTotal(body.idDetail, userInfo.idUser),
        client: await getOneUserById(existSale!.idClient),
        results: listSales,
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

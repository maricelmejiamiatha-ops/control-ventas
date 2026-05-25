import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma.libs";
import {
  getPagination,
  getPaginationInfo,
} from "@/app/helpers/pagination.helper";
import { getInfoUserFromToken } from "@/app/helpers";
import { PAGINATION_LIMIT } from "@/app/config/pagination.config";
import { getOneUserById } from "@/app/services/clients.services";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userInfo = await getInfoUserFromToken(request);

    const { page, take, skip } = getPagination(body.page, PAGINATION_LIMIT);
    const total = await prisma.detail.count({
      where: {
        idUser: userInfo.idUser,
      },
    });

    const listSalesOriginal = await prisma.detail.findMany({
      where: {
        idUser: userInfo.idUser,
      },
      orderBy: {
        dateDetail: "desc",
      },
      skip,
      take,
      select: {
        idDetail: true,
        idClient: true,
        dateDetail: true,
        total: true,
        client: {
          select: {
            idClient: true,
            nameClient: true,
            ciClient: true,
          },
        },
      },
    });

    const listSales = listSalesOriginal.map(({ client, ...sale }) => ({
      ...sale,
      infoClient: client,
    }));

    const info = getPaginationInfo(total, page, take);

    return NextResponse.json(
      {
        success: true,
        message: "Lista de ventas",
        info,
        results: listSales,
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

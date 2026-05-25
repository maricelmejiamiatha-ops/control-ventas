import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma.libs";
import { getPagination, getPaginationInfo } from "@/app/helpers";
import { PAGINATION_LIMIT } from "@/app/config/pagination.config";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { page, take, skip } = getPagination(body.page, PAGINATION_LIMIT);
    const total = await prisma.client.count();
    
    const listUsers = await prisma.client.findMany({
      orderBy: {
        idClient: "asc",
      },
      skip,
      take,
      select: {
        idClient: true,
        nameClient: true,
        ciClient: true,
      },
    });
    const info = getPaginationInfo(total, page, take);

    return NextResponse.json(
      {
        success: true,
        message: "Lista de clientes",
        info: info,
        results: listUsers,
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

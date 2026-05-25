import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const itemDetail = await prisma.detail.findFirst({
      where: {
        idDetail: data.idDetail,
      },
      select: {
        total: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Total of your buy",
        subTotal: itemDetail?.total,
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

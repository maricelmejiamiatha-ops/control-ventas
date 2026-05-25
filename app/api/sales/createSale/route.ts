import { NextRequest, NextResponse } from "next/server";
import { getInfoUserFromToken } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";
import { randomUUID, createHash } from "crypto";
import { getOneUserById } from "@/app/services/clients.services";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const userInfo = await getInfoUserFromToken(request);
    const cufCode = createHash("sha256")
      .update(randomUUID())
      .digest("hex")
      .toUpperCase();

    const information = await prisma.detail.create({
      data: {
        idUser: userInfo.idUser,
        idClient: data.idClient,
        dateDetail: new Date(data.dateDetail),
        cufCode,
      },
    });

    const returnInfo = {
      idDetail: information.idDetail,
      infoClient: await getOneUserById(information.idClient),
      dateDetail: information.dateDetail,
      total: information.total,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Venta creada correctamente",
        results: returnInfo,
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

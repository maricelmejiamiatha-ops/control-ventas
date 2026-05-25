import { NextResponse } from "next/server";
import { getInfoUserFromToken } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const userInfo = await getInfoUserFromToken(request);

    const userData = await prisma.user.update({
      where: {
        idUser: userInfo.idUser,
      },
      data: {
        fullNameUser: data.fullNameUser,
        nitUser: data.nitUser,
        numberPhoneUser: data.numberPhoneUser,
        codeUser: data.codeUser,
        emailUser: data.emailUser,
        numberSucursal: data.numberSucursal,
        locality: data.locality,
        numberLocality: data.numberLocality,
        city: data.city,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Informacion personal actualizada",
        results: {
          fullNameUser: userData.fullNameUser,
          nitUser: userData.nitUser,
          numberPhoneUser: userData.numberPhoneUser,
          codeUser: userData.codeUser,
          emailUser: userData.emailUser,
          numberSucursal: userData.numberSucursal,
          locality: userData.locality,
          numberLocality: userData.numberLocality,
          city: userData.city,
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

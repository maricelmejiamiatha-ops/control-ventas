import { NextResponse } from "next/server";
import { hashPassword } from "@/app/helpers";
import prisma from "@/app/libs/prisma.libs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const hashedPassword = await hashPassword(data.passwordUser);
    await prisma.user.create({
      data: {
        fullNameUser: data.fullNameUser,
        nitUser: data.nitUser,
        numberPhoneUser: data.numberPhoneUser,
        codeUser: data.codeUser,
        emailUser: data.emailUser,
        passwordUser: hashedPassword,
        numberSucursal: data.numberSucursal,
        locality: data.locality,
        numberLocality: data.numberLocality,
        city: data.city,
      },
    });
    return NextResponse.json("Registrado con exito", { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getInfoUserFromToken } from "@/app/helpers";
import { getUserByID } from "@/app/services/user.services";

export async function POST(request: Request) {
  try {
    const userInfo = await getInfoUserFromToken(request);
    return NextResponse.json(
      {
        success: true,
        message: "Informacion personal",
        results: await getUserByID(userInfo.idUser),
      },
      {
        status: 201,
      },
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

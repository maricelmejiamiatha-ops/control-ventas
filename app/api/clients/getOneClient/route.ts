import { NextResponse } from "next/server";
import { getOneUserById } from "@/app/services/clients.services";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const existUser = await getOneUserById(data.idClient);
    
    if (!existUser) {
      return NextResponse.json(
        { success: false, message: "Cliente no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Cliente obtenido correctamente",
        results: existUser,
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

import { jwtVerify } from "jose";

export async function getInfoUserFromToken(request: Request) {
 const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("No autorizado");
  }

  const token = authHeader.split(" ")[1];

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload as { idUser: number };
}

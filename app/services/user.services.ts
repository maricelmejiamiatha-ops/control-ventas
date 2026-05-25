import prisma from "@/app/libs/prisma.libs";

export async function getUserByID(idUser: number) {
  return await prisma.user.findUnique({
    where: {
      idUser: idUser,
    },
    select: {
      fullNameUser: true,
      nitUser: true,
      numberPhoneUser: true,
      codeUser: true,
      emailUser: true,
      numberSucursal: true,
      locality: true,
      numberLocality: true,
      city: true,
    },
  });
}

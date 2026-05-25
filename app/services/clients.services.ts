import prisma from "@/app/libs/prisma.libs";

export async function getOneUserById(idClient: number) {
  return await prisma.client.findUnique({
    where: {
      idClient: idClient,
    },
    select: {
      idClient: true,
      nameClient: true,
      ciClient: true,
    },
  });
}

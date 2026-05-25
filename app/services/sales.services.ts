import prisma from "@/app/libs/prisma.libs";
import { listDetailsSubTotal } from "./saleItems.services";

export async function getDetailById(idDetail: number, idUser: number) {
  const detail = await prisma.detail.findUnique({
    where: {
      idDetail,
      idUser,
    },
    select: {
      idDetail: true,
      dateDetail: true,
      total: true,
      client: {
        select: {
          idClient: true,
          nameClient: true,
          ciClient: true,
        },
      },
    },
  });

  if (!detail) return [];

  const { client, ...sale } = detail;

  return {
    ...sale,
    infoClient: client,
  };
}

export async function calculateSubtotal(idDetail: number, idUser: number) {
  return await prisma.detail.update({
    where: {
      idDetail,
    },
    data: {
      total: await listDetailsSubTotal(idDetail, idUser),
    },
  });
}

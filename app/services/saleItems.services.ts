import prisma from "@/app/libs/prisma.libs";

export async function getDetailById(codeService: string) {
  return await prisma.listDetail.findFirst({
    where: {
      codeService: codeService,
    },
  });
}

export async function existItem(idListDetail: number, idDetail: number) {
  return await prisma.listDetail.findUnique({
    where: {
      idListDetail: idListDetail,
      idDetail: idDetail,
    },
  });
}

export async function listDetailsSubTotal(idDetail: number, idUser: number) {
  const listPrices = await prisma.listDetail.findMany({
    where: {
      idDetail,
      detail: {
        idUser,
      },
    },
    select: {
      subTotal: true,
    },
  });

  let subTotal = 0;
  for (const key in listPrices) {
    subTotal += listPrices[key].subTotal;
  }

  return subTotal;
}

export async function getDetailDate(idDetail: number) {
  const getDate = await prisma.detail.findFirst({
    where: {
      idDetail: idDetail,
    },
    select: {
      dateDetail: true,
    },
  });

  return new Date(getDate!.dateDetail)
    .toLocaleString("es-BO", {
      timeZone: "America/La_Paz",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
}

import { api } from "@/app/shared/api/axios";
import { ISalesSendData } from "../types";
import { URL_SALES } from "@/app/helpers/constants.helper";

export const getAllSales = async (page?: number) => {
  const response = await api.post(`${URL_SALES}/getAllSales`, {
    page,
  });
  return response.data;
};

export const getSaleById = async (idDetail: number) => {
  const response = await api.post(`${URL_SALES}/getOneSale`, {
    idDetail,
  });
  return response.data;
};

export const createNewSale = async ({
  idClient,
  dateDetail,
}: {
  idClient: number;
  dateDetail: string;
}) => {
  const response = await api.post(`${URL_SALES}/createSale`, {
    idClient,
    dateDetail,
  });
  return response.data;
};

export const deleteOneSale = async (idDetail: number) => {
  const response = await api.post(`${URL_SALES}/deleteSale`, {
    idDetail,
  });
  return response.data;
};

export const updateOneSale = async (data: ISalesSendData) => {
  const response = await api.put(`${URL_SALES}/updateSale`, {
    idDetail: data.idDetail,
    idClient: data.idClient,
    dateDetail: data.dateDetail,
    total: data.total,
  });
  return response.data;
};

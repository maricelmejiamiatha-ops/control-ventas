import { api } from "@/app/shared/api/axios";
import { ICreateItem, IUpdateItem } from "../types";
import { URL_ITEMS } from "@/app/helpers/constants.helper";

export const getAllItems = async (idDetail: number, page?: number) => {
  const response = await api.post(`${URL_ITEMS}/getAllItems`, {
    idDetail,
    page,
  });
  return response.data;
};

export const getItemById = async (idDetail: number, listDetail: number) => {
  const response = await api.post(`${URL_ITEMS}/getOneItem`, {
    idDetail,
    listDetail,
  });
  return response.data;
};

export const createNewItem = async (data: ICreateItem) => {
  const response = await api.post(`${URL_ITEMS}/addItem`, {
    idDetail: data.idDetail,
    codeService: data.codeService,
    amount: data.amount,
    unitMeasurement: data.unitMeasurement,
    descriptionDetail: data.descriptionDetail,
    unitPrice: data.unitPrice,
    discount: data.discount,
  });
  return response.data;
};

export const deleteOneItem = async (idDetail: number, idListDetail: number) => {
  const response = await api.post(`${URL_ITEMS}/deleteitem`, {
    idDetail,
    idListDetail,
  });
  return response.data;
};

export const updateOneItem = async (data: IUpdateItem) => {
  const response = await api.put(`${URL_ITEMS}/updateItem`, {
    idDetail: data.idDetail,
    idListDetail: data.idListDetail,
    codeService: data.codeService,
    amount: data.amount,
    unitMeasurement: data.unitMeasurement,
    descriptionDetail: data.descriptionDetail,
    unitPrice: data.unitPrice,
    discount: data.discount,
  });
  return response.data;
};

export const getTotalPrice = async (idDetail: number) => {
  const response = await api.post(`${URL_ITEMS}/getAllTotalPrice`, {
    idDetail,
  });
  return response.data;
}
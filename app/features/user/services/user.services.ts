import { api } from "@/app/shared/api/axios";
import { IPassword, IUser } from "../types";

export const getInfoUser = async () => {
  const response = await api.post(`/api/users/getUserById`);
  return response.data;
};

export const updateInfoUser = async (data: IUser) => {
  const response = await api.put(`/api/users/updateUser`, {
    fullNameUser: data.fullNameUser,
    nitUser: data.nitUser,
    numberPhoneUser: data.numberPhoneUser,
    codeUser: data.codeUser,
    emailUser: data.emailUser,
    numberSucursal: data.numberSucursal,
    locality: data.locality,
    numberLocality: data.numberLocality,
    city: data.city,
  });
  return response.data;
};

export const changePassword = async (data: IPassword) => {
  const response = await api.post(`/api/password/changePassword`, {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  });
  return response.data;
};

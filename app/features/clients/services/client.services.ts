import { api } from "@/app/shared/api/axios";
import { IClient } from "../types";

export const getAllUsers = async (page?: number) => {
  const response = await api.post("/api/clients/getAllClients", {
    page,
  });
  return response.data;
};

export const getOneUserByID = async (idClient: number) => {
  const response = await api.post("/api/clients/getOneClient", {
    idClient,
  });
  return response.data;
};

export const createNewUser = async (dataClient: Omit<IClient, "idClient">) => {
  const response = await api.post("/api/clients/createClient", {
    nameClient: dataClient.nameClient,
    ciClient: dataClient.ciClient,
  });
  return response.data;
};

export const updateOneUser = async (dataClient: IClient) => {
  const response = await api.post("/api/clients/updateClient", {
    idClient: dataClient.idClient,
    nameClient: dataClient.nameClient,
    ciClient: dataClient.ciClient,
  });
  return response.data;
};

export const deleteOneUser = async (idClient: number) => {
  const response = await api.post("/api/clients/deleteClient", {
    idClient,
  });
  return response.data;
};

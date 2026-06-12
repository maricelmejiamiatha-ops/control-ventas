"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectClientsError,
  selectClientsInfo,
  selectClientsLoading,
  selectClientsResults,
  selectCurrentClient,
  selectSuccesClientFlag,
} from "../store/client.selector";
import {
  getAllListClients,
  getClientByID,
  createClient,
  updateOneClientByID,
  deleteOneClientByID,
  clearCurrentClientData,
  clearSuccessFlagClient,
  resetAllDataClient,
} from "../store/client.slice";
import { IClient } from "../types";

export const useClient = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectClientsInfo);
  const results = useAppSelector(selectClientsResults);
  const currentClient = useAppSelector(selectCurrentClient);
  const loading = useAppSelector(selectClientsLoading);
  const error = useAppSelector(selectClientsError);
  const successClient = useAppSelector(selectSuccesClientFlag);

  const getAllClients = (page?: number) => {
    dispatch(getAllListClients(page));
  };

  const getOneClient = (idClient: number) => {
    dispatch(getClientByID(idClient));
  };

  const createNewClient = (dataClient: Omit<IClient, "idClient">) => {
    dispatch(createClient(dataClient));
  };

  const deleteOneClient = (idClient: number) => {
    dispatch(deleteOneClientByID(idClient));
  };

  const updateOneClient = (dataClient: IClient) => {
    dispatch(updateOneClientByID(dataClient));
  };

  const clearDataCurrentClient = () => {
    dispatch(clearCurrentClientData());
  };

  const resetCurrentStateClient = () => {
    dispatch(clearSuccessFlagClient());
  };

  const resetDataClient = () => {
    dispatch(resetAllDataClient());
  };

  return {
    info,
    results,
    successClient,
    currentClient,
    loading,
    error,
    getAllClients,
    getOneClient,
    createNewClient,
    deleteOneClient,
    updateOneClient,
    clearDataCurrentClient,
    resetCurrentStateClient,
    resetDataClient,
  };
};

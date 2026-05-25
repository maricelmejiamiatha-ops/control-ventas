"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectSalesInfo,
  selectSalesError,
  selectSalesLoading,
  selectSalesResults,
  selectCurrentSale,
} from "../store/sales/sales.selector";
import {
  getAllListSales,
  getSaleByID,
  createSale,
  updateOneSaleByID,
  deleteOneSaleByID,
  clearCurrentSaleData,
} from "../store/sales/sales.slice";
import { ISalesDetail } from "../types";

export const useSales = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectSalesInfo);
  const results = useAppSelector(selectSalesResults);
  const currentSale = useAppSelector(selectCurrentSale);
  const loading = useAppSelector(selectSalesLoading);
  const error = useAppSelector(selectSalesError);

  const getAllSales = (page?: number) => {
    dispatch(getAllListSales(page));
  };

  const getOneSale = (idDetail: number) => {
    dispatch(getSaleByID(idDetail));
  };

  const createNewSale = ({
    idClient,
    dateDetail,
  }: {
    idClient: number;
    dateDetail: string;
  }) => {
    dispatch(createSale({ idClient, dateDetail }));
  };

  const deleteOneSale = (idDetail: number) => {
    dispatch(deleteOneSaleByID(idDetail));
  };

  const updateOneSale = (data: ISalesDetail) => {
    dispatch(updateOneSaleByID(data));
  };

  const clearDataCurrentSale = () => {
    dispatch(clearCurrentSaleData());
  };

  return {
    info,
    results,
    currentSale,
    loading,
    error,
    getAllSales,
    getOneSale,
    createNewSale,
    deleteOneSale,
    updateOneSale,
    clearDataCurrentSale,
  };
};

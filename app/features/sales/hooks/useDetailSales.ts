"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentItem,
  selectItemError,
  selectItemInfo,
  selectItemLoading,
  selectItemResults,
  selectItemSubTotal,
  selectItemDate,
  selectItemCufCode,
  selectInfoClient,
} from "../store/details/detail.selector";
import {
  getAllListItems,
  getItemByID,
  createItem,
  deleteItem,
  updateItem,
  clearCurrentItemData,
  getAllPriceTotal,
} from "../store/details/detail.slice";
import { ICreateItem, IUpdateItem } from "../types";

export const useItems = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectItemInfo);
  const results = useAppSelector(selectItemResults);
  const subTotal = useAppSelector(selectItemSubTotal);
  const date = useAppSelector(selectItemDate);
  const cufCode = useAppSelector(selectItemCufCode);
  const currentItem = useAppSelector(selectCurrentItem);
  const loading = useAppSelector(selectItemLoading);
  const error = useAppSelector(selectItemError);
  const clientInfo = useAppSelector(selectInfoClient);

  const getAllItems = (idDetail: number, page?: number) => {
    dispatch(getAllListItems({ idDetail, page }));
  };

  const getOneItem = (idDetail: number, listDetail: number) => {
    dispatch(getItemByID({ idDetail, listDetail }));
  };

  const getTotalPrice = (idDetail: number) => {
    dispatch(getAllPriceTotal(idDetail));
  };

  const createNewItem = (data: ICreateItem) => {
    dispatch(createItem(data));
  };

  const deleteOneItem = (idDetail: number, listDetail: number) => {
    dispatch(deleteItem({ idDetail, listDetail }));
  };

  const updateOneItem = (data: IUpdateItem) => {
    dispatch(updateItem(data));
  };

  const clearDataCurrentItem = () => {
    dispatch(clearCurrentItemData());
  };

  return {
    info,
    results,
    subTotal,
    date,
    clientInfo,
    cufCode,
    currentItem,
    loading,
    error,
    getAllItems,
    getOneItem,
    createNewItem,
    deleteOneItem,
    updateOneItem,
    clearDataCurrentItem,
    getTotalPrice,
  };
};

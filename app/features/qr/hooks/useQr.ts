"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectQRResults,
  selectQRInfo,
  selectQRError,
  selectQRLoading,
} from "../store/qr.selector";
import { getAllInfoByQR, clearCurrentQRData } from "../store/qr.slice";

export const useQR = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectQRInfo);
  const results = useAppSelector(selectQRResults);
  const loading = useAppSelector(selectQRLoading);
  const error = useAppSelector(selectQRError);

  const getQRInfoAll = (idDetail: number) => {
    dispatch(getAllInfoByQR(idDetail));
  };

  const clearDataQR = () => {
    dispatch(clearCurrentQRData());
  };

  return {
    info,
    results,
    loading,
    error,
    getQRInfoAll,
    clearDataQR,
  };
};

import { RootState } from "@/app/store/store";

export const selectQRInfo = (state: RootState) => state.qr.info;
export const selectQRResults = (state: RootState) => state.qr.results;
export const selectQRLoading = (state: RootState) => state.qr.loading;
export const selectQRError = (state: RootState) => state.qr.error;
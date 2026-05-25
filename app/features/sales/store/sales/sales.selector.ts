import { RootState } from "@/app/store/store";

export const selectSalesInfo = (state: RootState) => state.sales.info;
export const selectSalesResults = (state: RootState) => state.sales.results;
export const selectSalesLoading = (state: RootState) => state.sales.loading;
export const selectSalesError = (state: RootState) => state.sales.error;
export const selectCurrentSale = (state: RootState) => state.sales.currentSale;
import { RootState } from "@/app/store/store";

export const selectItemInfo = (state: RootState) => state.items.info;
export const selectItemResults = (state: RootState) => state.items.results;
export const selectItemLoading = (state: RootState) => state.items.loading;
export const selectItemSubTotal = (state: RootState) => state.items.subTotal;
export const selectItemDate = (state: RootState) => state.items.date;
export const selectItemError = (state: RootState) => state.items.error;
export const selectCurrentItem = (state: RootState) => state.items.currentItem;
export const selectItemCufCode = (state: RootState) => state.items.cufCode;
export const selectInfoClient = (state: RootState) => state.items.infoClient;

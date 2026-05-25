import { RootState } from "@/app/store/store";

export const selectClientsInfo = (state: RootState) => state.clients.info;
export const selectClientsResults = (state: RootState) => state.clients.results;
export const selectClientsLoading = (state: RootState) => state.clients.loading;
export const selectClientsError = (state: RootState) => state.clients.error;
export const selectCurrentClient = (state: RootState) => state.clients.currentClient;
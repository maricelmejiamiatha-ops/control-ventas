import { RootState } from "@/app/store/store";

export const selectUserInfo = (state: RootState) => state.user.info;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/features/auth/store/auth.slice";
import salesReducer from "@/app/features/sales/store/sales/sales.slice";
import itemReducer from "@/app/features/sales/store/details/detail.slice";
import userReducer from "@/app/features/user/store/user.slice";
import qrReducer from "@/app/features/qr/store/qr.slice";
import clientReducer from "@/app/features/clients/store/client.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: salesReducer,
    items: itemReducer,
    user: userReducer,
    qr: qrReducer,
    clients: clientReducer
  },
  devTools: process.env.AROUND_DEVELOP === "develop",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IApiResponse, IInfoDetails, IError } from "../types";
import { getQRInfo } from "../services/qr.services";
import { IItem } from "../../sales";

export interface IQRState {
  info: IInfoDetails | null;
  results: IItem[];
  loading: boolean;
  error: string | null;
}

const initialState: IQRState = {
  info: null,
  results: [],
  loading: false,
  error: null,
};

export const getAllInfoByQR = createAsyncThunk<
  IApiResponse,
  number,
  { rejectValue: IError }
>("qr/getAllInfo", async (idDetail, { rejectWithValue }) => {
  try {
    return await getQRInfo(idDetail);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

const qrSlice = createSlice({
  name: "qr",
  initialState,
  reducers: {
    clearInfoQRError: (state) => {
      state.error = null;
    },
    clearCurrentQRData: (state) => {
      state.info = null;
      state.results = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllInfoByQR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInfoByQR.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllInfoByQR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default qrSlice.reducer;
export const { clearInfoQRError, clearCurrentQRData } = qrSlice.actions;

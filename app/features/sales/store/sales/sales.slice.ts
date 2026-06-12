import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IResponse,
  ISalesSingleResponse,
  IError,
  IPagination,
  ISalesDetail,
  ISalesSendData,
} from "../../types";
import {
  getAllSales,
  getSaleById,
  createNewSale,
  updateOneSale,
  deleteOneSale,
} from "../../services/sales.services";

export interface ISalesState {
  info: IPagination | null;
  results: ISalesDetail[];
  currentSale: ISalesDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ISalesState = {
  info: null,
  results: [],
  currentSale: null,
  loading: false,
  error: null,
};

export const getAllListSales = createAsyncThunk<
  IResponse,
  number | undefined,
  { rejectValue: IError }
>("sales/getAll", async (page, { rejectWithValue }) => {
  try {
    return await getAllSales(page);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const getSaleByID = createAsyncThunk<
  ISalesSingleResponse,
  number,
  { rejectValue: IError }
>("sales/getById", async (id, { rejectWithValue }) => {
  try {
    return await getSaleById(id);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const createSale = createAsyncThunk<
  ISalesSingleResponse,
  { idClient: number; dateDetail: string },
  { rejectValue: IError }
>("sales/create", async ({ idClient, dateDetail }, { rejectWithValue }) => {
  try {
    return await createNewSale({ idClient, dateDetail });
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const updateOneSaleByID = createAsyncThunk<
  ISalesSingleResponse,
  ISalesSendData,
  { rejectValue: IError }
>("sales/update", async (data, { rejectWithValue }) => {
  try {   
    return await updateOneSale(data);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const deleteOneSaleByID = createAsyncThunk<
  ISalesSingleResponse,
  number,
  { rejectValue: IError }
>("sales/delete", async (id, { rejectWithValue }) => {
  try {
    return await deleteOneSale(id);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    clearInfoSalesError: (state) => {
      state.error = null;
    },
    clearCurrentSaleData: (state) => {
      state.currentSale = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListSales.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getSaleByID.fulfilled, (state, action) => {
        state.currentSale = action.payload.results;
      })

      // TODO CREATE
      .addCase(createSale.fulfilled, (state, action) => {
        // state.results.unshift(action.payload.results);
      })

      // TODO UPDATE
      .addCase(updateOneSaleByID.fulfilled, (state, action) => {
        const updated = action.payload.results;
        state.results = state.results.map((item) =>
          item.idDetail === updated.idDetail ? updated : item,
        );
      })

      // TODO DELETE
      .addCase(deleteOneSaleByID.fulfilled, (state, action) => {
        const idDetail = action.payload.results.idDetail;
        state.results = state.results.filter(
          (item) => item.idDetail !== idDetail,
        );
      });
  },
});

export default salesSlice.reducer;
export const { clearInfoSalesError, clearCurrentSaleData } = salesSlice.actions;

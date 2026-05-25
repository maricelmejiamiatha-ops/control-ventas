import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IError,
  IPagination,
  IItem,
  IResponseItems,
  IResponseItem,
  ICreateItem,
  IUpdateItem,
  ITotalPrice,
} from "../../types";
import {
  createNewItem,
  updateOneItem,
  deleteOneItem,
  getAllItems,
  getItemById,
  getTotalPrice,
} from "../../services/detail.services";
import { IClient } from "@/app/features/clients";

export interface IDetailITems {
  info: IPagination | null;
  subTotal: number;
  date: string;
  cufCode: string;
  results: IItem[];
  infoClient: IClient | null;
  currentItem: IItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: IDetailITems = {
  info: null,
  subTotal: 0,
  date: "",
  cufCode: "",
  results: [],
  infoClient: null,
  currentItem: null,
  loading: false,
  error: null,
};

export const getAllListItems = createAsyncThunk<
  IResponseItems,
  { idDetail: number; page: number | undefined },
  { rejectValue: IError }
>("items/getList", async ({ idDetail, page }, { rejectWithValue }) => {
  try {
    return await getAllItems(idDetail, page);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const getItemByID = createAsyncThunk<
  IResponseItem,
  { idDetail: number; listDetail: number },
  { rejectValue: IError }
>("items/getByID", async ({ idDetail, listDetail }, { rejectWithValue }) => {
  try {
    return await getItemById(idDetail, listDetail);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const createItem = createAsyncThunk<
  IResponseItem,
  ICreateItem,
  { rejectValue: IError }
>("item/addItem", async (data, { rejectWithValue }) => {
  try {
    return await createNewItem(data);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const updateItem = createAsyncThunk<
  IResponseItem,
  IUpdateItem,
  { rejectValue: IError }
>("item/updateItem", async (data, { rejectWithValue }) => {
  try {
    return await updateOneItem(data);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const deleteItem = createAsyncThunk<
  IResponseItem,
  { idDetail: number; listDetail: number },
  { rejectValue: IError }
>("item/deleteItem", async ({ idDetail, listDetail }, { rejectWithValue }) => {
  try {
    return await deleteOneItem(idDetail, listDetail);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const getAllPriceTotal = createAsyncThunk<
  ITotalPrice,
  number,
  { rejectValue: IError }
>("item/getTotalPrice", async (idDetail, { rejectWithValue }) => {
  try {
    return await getTotalPrice(idDetail);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearInfoItemsError: (state) => {
      state.error = null;
    },
    clearCurrentItemData: (state) => {
      state.currentItem = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllListItems.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
        state.subTotal = action.payload.subTotal;
        state.date = action.payload.date;
        state.cufCode = action.payload.cufCode;
        state.infoClient = action.payload.client;
      })

      .addCase(getAllListItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getItemByID.fulfilled, (state, action) => {
        state.currentItem = action.payload.results;
      })

      // TODO GET TOTAL PRICE
      .addCase(getAllPriceTotal.fulfilled, (state, action) => {
        state.subTotal = action.payload.subTotal;
      })

      // TODO CREATE
      .addCase(createItem.fulfilled, (state, action) => {
        state.results.unshift(action.payload.results);
      })

      // TODO UPDATE
      .addCase(updateItem.fulfilled, (state, action) => {
        const updated = action.payload.results;
        state.results = state.results.map((item) =>
          item.idListDetail === updated.idListDetail ? updated : item,
        );
      })

      // TODO DELETE
      .addCase(deleteItem.fulfilled, (state, action) => {
        const idListDetail = action.payload.results;
        state.results = state.results.filter(
          (item) => item.idListDetail !== idListDetail.idListDetail,
        );
      });
  },
});

export default itemsSlice.reducer;
export const { clearInfoItemsError, clearCurrentItemData } = itemsSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IClient,
  IClientSingleResponse,
  IError,
  IPagination,
  IResponse,
} from "../types";
import {
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getAllUsers,
  getOneUserByID,
} from "../services/client.services";

export interface IClientState {
  info: IPagination | null;
  results: IClient[];
  currentClient: IClient | null;
  loading: boolean;
  error: string | null;
}

const initialState: IClientState = {
  info: null,
  results: [],
  currentClient: null,
  loading: false,
  error: null,
};

export const getAllListClients = createAsyncThunk<
  IResponse,
  number | undefined,
  { rejectValue: IError }
>("client/getAllClients", async (page, { rejectWithValue }) => {
  try {
    return await getAllUsers(page);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const getClientByID = createAsyncThunk<
  IClientSingleResponse,
  number,
  { rejectValue: IError }
>("client/getUserByID", async (idClient, { rejectWithValue }) => {
  try {
    return await getOneUserByID(idClient);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const createClient = createAsyncThunk<
  IClientSingleResponse,
  Omit<IClient, "idClient">,
  { rejectValue: IError }
>("client/creteClient", async (dataClient, { rejectWithValue }) => {
  try {
    return await createNewUser(dataClient);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const updateOneClientByID = createAsyncThunk<
  IClientSingleResponse,
  IClient,
  { rejectValue: IError }
>("client/updateClient", async (dataClient, { rejectWithValue }) => {
  try {
    return await updateOneUser(dataClient);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const deleteOneClientByID = createAsyncThunk<
  IClientSingleResponse,
  number,
  { rejectValue: IError }
>("client/deleteClient", async (idClient, { rejectWithValue }) => {
  try {
    return await deleteOneUser(idClient);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    clearInfoClientError: (state) => {
      state.error = null;
    },
    clearCurrentClientData: (state) => {
      state.currentClient = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListClients.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getClientByID.fulfilled, (state, action) => {
        state.currentClient = action.payload.results;
      })

      // TODO CREATE
      .addCase(createClient.fulfilled, (state, action) => {
        state.results.unshift(action.payload.results);
      })

      // TODO UPDATE
      .addCase(updateOneClientByID.fulfilled, (state, action) => {
        const updated = action.payload.results;
        state.results = state.results.map((item) =>
          item.idClient === updated.idClient ? updated : item,
        );
      })

      // TODO DELETE
      .addCase(deleteOneClientByID.fulfilled, (state, action) => {
        const idClient = action.payload.results.idClient;
        state.results = state.results.filter(
          (item) => item.idClient !== idClient,
        );
      });
  },
});

export default clientSlice.reducer;
export const { clearInfoClientError, clearCurrentClientData } =
  clientSlice.actions;

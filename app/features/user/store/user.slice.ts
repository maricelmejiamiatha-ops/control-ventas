import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IUserInfo, IPassword } from "../types";
import {
  getInfoUser,
  updateInfoUser,
  changePassword,
} from "../services/user.services";
import { IError } from "../../sales";

export interface IUserState {
  info: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  info: null,
  loading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk<
  IUserInfo,
  void,
  { rejectValue: IError }
>("user/getById", async (_, { rejectWithValue }) => {
  try {
    return await getInfoUser();
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const updateUserInfo = createAsyncThunk<
  IUserInfo,
  IUser,
  { rejectValue: IError }
>("user/updateInfo", async (data, { rejectWithValue }) => {
  try {
    return await updateInfoUser(data);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

export const changePasswordUser = createAsyncThunk<
{ succes: boolean; message: string },
  IPassword,
  { rejectValue: IError }
>("user/getById", async (data, { rejectWithValue }) => {
  try {
    return await changePassword(data);
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearInfoSalesError: (state) => {
      state.error = null;
    },
    clearInfoUser: (state) => {
      state.info = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET INFO USER
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.info = action.payload.results;
      })

      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE INFO USER
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.info = action.payload.results;
      });
  },
});

export default userSlice.reducer;
export const { clearInfoSalesError, clearInfoUser } = userSlice.actions;

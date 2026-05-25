"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectUserError,
  selectUserInfo,
  selectUserLoading,
} from "../store/user.selector";
import {
  getUserInfo,
  updateUserInfo,
  changePasswordUser,
  clearInfoUser,
} from "../store/user.slice";
import { IUser, IPassword } from "../types";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectUserInfo);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const getInfoUser = () => {
    dispatch(getUserInfo());
  };

  const updateInfoUser = (data: IUser) => {
    dispatch(updateUserInfo(data));
  };

  const changeUserPassword = (data: IPassword) => {
    dispatch(changePasswordUser(data));
  };

  const clearUserInfo = () => {
    dispatch(clearInfoUser());
  };

  return {
    info,
    loading,
    error,
    getInfoUser,
    updateInfoUser,
    changeUserPassword,
    clearUserInfo,
  };
};

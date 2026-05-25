import { IClient } from "../clients";
import { IItem } from "../sales";
import { IUser } from "../user";

export interface IError {
  success: false;
  message: string;
}

export interface IInfoDetails {
  client: Omit<IClient, "idClient">;
  subTotal: number;
  date: string;
  cufCode: string;
  user: IUser;
}

export interface IApiResponse {
  success: boolean;
  message: string;
  info: IInfoDetails;
  results: IItem[];
}

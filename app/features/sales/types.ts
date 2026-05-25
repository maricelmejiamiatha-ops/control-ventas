import { IClient } from "../clients";

export interface IPagination {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IError {
  success: false;
  message: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  results: T;
}

export interface IResponse {
  success: boolean;
  message: string;
  info: IPagination;
  results: ISalesDetail[];
}

export interface ITotalPrice {
  success: boolean;
  message: string;
  subTotal: number;
}

// TODO SALES
export interface ISalesDetail {
  idDetail: number;
  idClient: number;
  dateDetail: string;
  total: number;
  infoClient: IClient;
}

export type ISalesSingleResponse = IApiResponse<ISalesDetail>;

export interface ISalesSendData {
  idDetail: number;
  idClient: number;
  dateDetail: string;
  total: number;
}

export interface ICreateSale {
  dateDetail: string;
}

// TODO ITEM DETAILS
export interface IItem {
  idListDetail: number;
  idDetail: number;
  codeService: string;
  amount: number;
  unitMeasurement: string;
  descriptionDetail: string;
  unitPrice: number;
  discount: number;
  subTotal: number;
}

export interface ICreateItem {
  idDetail: number;
  codeService: string;
  amount: number;
  unitMeasurement: string;
  descriptionDetail: string;
  unitPrice: number;
  discount: number;
}

export interface IUpdateItem {
  idDetail: number;
  idListDetail: number;
  codeService: string;
  amount: number;
  unitMeasurement: string;
  descriptionDetail: string;
  unitPrice: number;
  discount: number;
}

export interface IResponseItem {
  success: boolean;
  message: string;
  results: IItem;
}

export interface IResponseItems {
  client: { idClient: number; nameClient: string; ciClient: string } | null;
  success: boolean;
  message: string;
  subTotal: number;
  date: string;
  cufCode: string;
  info: IPagination;
  results: IItem[];
  infoClient: IClient;
}

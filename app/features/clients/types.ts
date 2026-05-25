export interface IClient {
  idClient: number;
  nameClient: string;
  ciClient: string;
}

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
  results: IClient[];
}

export type IClientSingleResponse = IApiResponse<IClient>;

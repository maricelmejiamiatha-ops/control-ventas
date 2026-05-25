import { api } from "@/app/shared/api/axios";

export const getQRInfo = async (idDetail: number) => {
  const response = await api.post(`/api/qr/getItem`, { idDetail });
  return response.data;
};

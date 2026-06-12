"use client";
import { useEffect, useState } from "react";
import SalesTable from "@/app/features/sales/components/SalesTable";
import SCPagination from "@/app/shared/components/SCPagination";
import SalesButtonModal from "@/app/features/sales/components/SalesButtonModal";
import { useSales } from "@/app/features/sales/hooks/useSales";
import { useUser } from "@/app/features/user/hooks/useUser";

function Page() {
  const { info, results, getAllSales } = useSales();
  const {getInfoUser} = useUser();
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    getAllSales();
    getInfoUser();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de ventas</h1>
        <SalesButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1">
        <SalesTable resultSales={results} render="sales" />
      </div>

      <div className="flex justify-center mt-6">
        <SCPagination infoSales={info} render="sales" />
      </div>
    </div>
  );
}

export default Page;

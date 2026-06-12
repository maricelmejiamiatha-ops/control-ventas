"use client";
import React, { useEffect } from "react";
import { useClient } from "@/app/features/clients/hooks/useClient";
import SCPagination from "@/app/shared/components/SCPagination";
import ClientButtonModal from "@/app/features/clients/components/ClientButtonModal";
import ClientTable from "@/app/features/clients/components/ClientTable";

function Page() {
  const { info, results, getAllClients } = useClient();
  useEffect(()=>{
    getAllClients();
  },[])

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de clientes</h1>
        <ClientButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1">
        <ClientTable resultClients={results} />
      </div>

      <div className="flex justify-center mt-6">
        <SCPagination infoSales={info} render={undefined} />
      </div>
    </div>
  );
}

export default Page;

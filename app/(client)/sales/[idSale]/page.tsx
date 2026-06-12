"use client";
import SalesTable from "@/app/features/sales/components/SalesTable";
import { useItems } from "@/app/features/sales/hooks/useDetailSales";
import React, { useEffect } from "react";
import SCPagination from "@/app/shared/components/SCPagination";
import ItemButtonModal from "@/app/features/sales/components/ItemButtonModal";
import PDFButton from "@/app/features/sales/components/PDFButton";
import { useUser } from "@/app/features/user/hooks/useUser";

interface IParams {
  params: Promise<{
    idSale: string;
  }>;
}

function Page({ params }: IParams) {
  const { idSale } = React.use(params);
  const { info, results, date, cufCode, subTotal, getAllItems, clientInfo } =
    useItems();
  const { info: userInfo } = useUser();

  useEffect(() => {
    getAllItems(+idSale);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-row md:flex-row md:items-center md:justify-between gap-8 mb-4">
        <h1 className="text-[30px] font-bold">Detalle de venta</h1>

        <div className="flex flex-wrap md:flex-nowrap justify-start md:justify-end items-center gap-2">
          <ItemButtonModal text="Crear" action="create" idDetail={+idSale} />

          {results.length > 0 && (
            <PDFButton
              idDetail={+idSale}
              date={date}
              cufCode={cufCode}
              items={results}
              subTotal={subTotal}
              userInfo={userInfo}
              clientInfo={clientInfo}
            />
          )}
        </div>
      </div>

      <div className="flex-1">
        <SalesTable resultSales={results} render="items" />
      </div>

      <div className="flex justify-center mt-6">
        <SCPagination infoSales={info} render={undefined} />
      </div>
    </div>
  );
}

export default Page;

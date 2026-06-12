import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useSales } from "@/app/features/sales/hooks/useSales";

function CPagination({ infoSales, render }: any) {
  const { getAllSales } = useSales();
  const [current, setCurrent] = useState(1);

  const onChange = (page: number) => {
    setCurrent(page);

    switch (render) {
      case "sales":
        getAllSales(page);
        break;
    }
  };

  return (
    <Pagination
      current={current}
      onChange={onChange}
      total={infoSales?.count || 0}
      pageSize={
        infoSales?.pages ? Math.ceil(infoSales.count / infoSales.pages) : 1
      }
    />
  );
}

export default CPagination;

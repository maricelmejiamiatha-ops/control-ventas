import React from "react";
import { Pagination } from "antd";

function CPagination({ infoSales }: any) {
  return (
    <>
      <Pagination align="center" defaultCurrent={1} total={50} />
    </>
  );
}

export default CPagination;

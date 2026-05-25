"use client";
import React from "react";
import { Table } from "antd";
import SalesButtonActions from "./SalesButtonActions";
import SalesButtonModal from "./SalesButtonModal";
import ItemButtonModal from "./ItemButtonModal";

const columnsSales = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Fecha",
    dataIndex: "dateDetail",
    key: "dateDetail",
    width: 180,
  },
  {
    title: "Cliente",
    dataIndex: "nameClient",
    key: "nameClient",
    width: 180,
  },
  {
    title: "CI",
    dataIndex: "ciClient",
    key: "ciClient",
    width: 180,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: 120,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idDetail }: any) => (
      <div className="flex gap-1">
        <SalesButtonActions Text="Ver" idDetail={idDetail} />
        <SalesButtonModal text="Editar" action="update" idDetail={idDetail} />
        <SalesButtonModal text="Eliminar" action="delete" idDetail={idDetail} />
      </div>
    ),
  },
];

const salesMapInfo = (data: any) => {
  return data?.map(
    (
      { idDetail, idClient, dateDetail, total, infoClient }: any,
      index: any,
    ) => ({
      key: idDetail,
      idDetail,
      idClient,
      numberItem: index + 1,
      dateDetail: dateDetail?.split("T")[0],
      total: total.toFixed(2),
      nameClient: infoClient.nameClient,
      ciClient: infoClient.ciClient,
    }),
  );
};

const columnItems = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
  },
  {
    title: "Codigo de servicio",
    dataIndex: "codeService",
    key: "codeService",
  },
  { title: "Cantidad", dataIndex: "amount", key: "amount" },
  {
    title: "Unidad de medida",
    dataIndex: "unitMeasurement",
    key: "unitMeasurement",
  },
  {
    title: "Descripcion",
    dataIndex: "descriptionDetail",
    key: "descriptionDetail",
  },
  {
    title: "Precio U.",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  {
    title: "Descuento",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Sub total",
    dataIndex: "subTotal",
    key: "subTotal",
  },
  {
    title: "Acciones",
    key: "actions",
    render: ({ idDetail, idListDetail }: any) => (
      <div className="flex flex-col items-center gap-4 md:flex md:flex-row">
        <ItemButtonModal
          text="Editar"
          action="update"
          idDetail={idDetail}
          idListDetail={idListDetail}
        />
        <ItemButtonModal
          text="Eliminar"
          action="delete"
          idDetail={idDetail}
          idListDetail={idListDetail}
        />
      </div>
    ),
  },
];

const itemsMapInfo = (data: any) => {
  return data?.map(
    (
      {
        idDetail,
        idListDetail,
        codeService,
        amount,
        unitMeasurement,
        descriptionDetail,
        unitPrice,
        discount,
        subTotal,
      }: any,
      index: any,
    ) => ({
      key: idListDetail,
      idDetail,
      idListDetail,
      numberItem: index + 1,
      codeService,
      amount,
      unitMeasurement,
      descriptionDetail,
      unitPrice,
      discount,
      subTotal,
    }),
  );
};

const SalesTable = ({ resultSales, render }: any) => {
  return (
    <>
      {render === "sales" && (
        <Table<any>
          columns={columnsSales}
          dataSource={salesMapInfo(resultSales)}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      )}
      {render === "items" && (
        <Table<any>
          columns={columnItems}
          dataSource={itemsMapInfo(resultSales)}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      )}
    </>
  );
};

export default SalesTable;

"use client";
import React from "react";
import { Table } from "antd";
import ClientButtonModal from "./ClientButtonModal";

const columnsClient = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
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
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idClient }: any) => (
      <div className="flex gap-1">
        <ClientButtonModal text="Editar" action="update" idClient={idClient} />
        <ClientButtonModal
          text="Eliminar"
          action="delete"
          idClient={idClient}
        />
      </div>
    ),
  },
];

const clientMapInfo = (data: any) => {
  return data?.map(({ idClient, nameClient, ciClient }: any, index: any) => ({
    key: idClient,
    idClient,
    numberItem: index + 1,
    nameClient: nameClient,
    ciClient: ciClient,
  }));
};

function ClientTable({ resultClients }: any) {
  return (
    <Table<any>
      columns={columnsClient}
      dataSource={clientMapInfo(resultClients)}
      pagination={false}
      scroll={{ x: 1000 }}
    />
  );
}

export default ClientTable;

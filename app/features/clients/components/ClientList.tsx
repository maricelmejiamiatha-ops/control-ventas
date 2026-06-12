"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  List,
  Skeleton,
  ConfigProvider,
  FormInstance,
} from "antd";
import { useClient } from "../hooks/useClient";
import { IClient } from "../types";

type ClientFormValues = {
  idClient: number;
  client: string;
};

type ClientListProps = {
  form: FormInstance<ClientFormValues>;
};

const ClientList = ({ form }: ClientListProps) => {
  const {
    info,
    results,
    getAllClients,
    successClient,
    resetCurrentStateClient,
    resetDataClient,
  } = useClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [list, setList] = useState<Omit<IClient, "ciClient">[]>([]);
  const [current, setCurrent] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
    setCurrent(1);
    setInitLoading(true);
    getAllClients(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetDataClient();
    resetCurrentStateClient();
    setList([]);
    setCurrent(1);
    setInitLoading(false);
  };

  const fetchData = () => {
    const nextPage = current + 1;
    getAllClients(nextPage);
    setCurrent(nextPage);
  };

  const handleChooseClient = (idClient: number) => {
    const client = list.find((item) => item.idClient === idClient);
    if (!client) return;

    form.setFieldsValue({
      idClient: client.idClient,
      client: client.nameClient,
    });

    closeModal();
  };

  useEffect(() => {
    if (!successClient) return;

    if (current === 1) {
      setList(results);
    } else {
      setList((prev) => [...prev, ...results]);
    }

    setInitLoading(false);
    resetCurrentStateClient();
  }, [successClient, results, current]);

  const loadMore =
    !initLoading && current < (info?.pages || 1) ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={fetchData}>Cargar más</Button>
      </div>
    ) : null;

  return (
    <ConfigProvider
      warning={{
        strict: false,
      }}
    >
      <>
        <Button type="primary" onClick={showModal}>
          ...
        </Button>

        <Modal
          title="Lista de clientes"
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
        >
          <List
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                key={item.idClient}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseClient(item.idClient)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameClient}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
};

export default ClientList;

"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Avatar, List, Skeleton, ConfigProvider } from "antd";
import { useClient } from "../hooks/useClient";

interface DataType {
  gender?: string;
  name?: string;
  email?: string;
  avatar?: string;
  loading: boolean;
}

const PAGE_SIZE = 3;

const ClientList = ({ form }: any) => {
  const { info, results } = useClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = (currentPage: number) => {
    const fakeDataUrl = `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users?page=${currentPage}&limit=${PAGE_SIZE}`;
    return fetch(fakeDataUrl).then((res) => res.json());
  };

  const handleChooseClient = (idClient: number) => {
    const userInfo = results.find((item) => item.idClient === idClient);
    if (!userInfo) return;
    form.setFieldsValue({
      idClient: userInfo.idClient,
      client: userInfo.nameClient,
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData(page).then((res) => {
      const results = Array.isArray(res) ? res : [];
      setInitLoading(false);
      setData(results);
      setList(results);
    });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        Array.from({ length: PAGE_SIZE }).map(() => ({ loading: true })),
      ),
    );
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage).then((res) => {
      const results = Array.isArray(res) ? res : [];
      const newData = data.concat(results);
      setData(newData);
      setList(newData);
      setLoading(false);
      window.dispatchEvent(new Event("resize"));
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Cargar más</Button>
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
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={results}
            renderItem={(item) => (
              <List.Item
                key={item.idClient}
                actions={[<a key="list-loadmore-edit">Seleccionar</a>]}
                onClick={() => handleChooseClient(item.idClient)}
              >
                <Skeleton avatar title={false} loading={false} active>
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

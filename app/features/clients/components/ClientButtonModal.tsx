"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, FormProps, Input } from "antd";
import { useClient } from "../hooks/useClient";
import {
  DeleteOutlined,
  FolderAddOutlined,
  FormOutlined,
} from "@ant-design/icons";

type ISalesForm = {
  text: string;
  action: string;
  idClient?: number;
};

type ClientFormValues = {
  nameClient: string;
  ciClient: string;
};

function ClientButtonModal({ text, action, idClient }: ISalesForm) {
  const {
    getOneClient,
    createNewClient,
    updateOneClient,
    deleteOneClient,
    currentClient,
    clearDataCurrentClient,
  } = useClient();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<ClientFormValues>["onFinish"] = (values) => {
    if (action === "create") {
      createNewClient({
        nameClient: values.nameClient,
        ciClient: values.ciClient,
      });
      setIsModalOpen(false);
      form.resetFields();
    }

    if (action === "delete" && idClient) {
      deleteOneClient(idClient);
    }

    if (action === "update" && currentClient?.idClient) {
      updateOneClient({
        ...currentClient,
        idClient: currentClient.idClient,
        nameClient: values.nameClient,
        ciClient: values.ciClient,
      });
    }
  };

  useEffect(() => {
    if (action === "update" && currentClient) {
      form.setFieldsValue({
        nameClient: currentClient.nameClient,
        ciClient: currentClient.ciClient,
      });
    }
  }, [action, currentClient, form]);

  useEffect(() => {
    if (action === "update" && isModalOpen && idClient) {
      getOneClient(idClient);
    }
  }, [action, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      clearDataCurrentClient();
    }
  }, [isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <FolderAddOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} cliente`}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form form={form} onFinish={onFinish} autoComplete="off">
          {action !== "delete" && (
            <>
              <Form.Item
                label="Nombre"
                name="nameClient"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nombre del cliente" />
              </Form.Item>

              <Form.Item
                label="C.I. de identidad"
                name="ciClient"
                rules={[{ required: true }]}
              >
                <Input placeholder="8345752" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {action === "delete" && "Eliminar"}
              {action === "create" && "Crear"}
              {action === "update" && "Editar"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ClientButtonModal;

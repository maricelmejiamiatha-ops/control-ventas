"use client";
import { useEffect, useState } from "react";
import { Button, Modal, Form, FormProps, DatePicker, Input } from "antd";
import { useSales } from "../hooks/useSales";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

import {
  DeleteOutlined,
  FolderAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import ClientList from "../../clients/components/ClientList";

type FieldType = {
  idClient: number;
  dateDetail: Dayjs;
};

type ISalesForm = {
  text: string;
  action: string;
  idDetail?: number;
};

function SalesButtonModal({ text, action, idDetail }: ISalesForm) {
  const {
    getOneSale,
    clearDataCurrentSale,
    createNewSale,
    deleteOneSale,
    updateOneSale,
    currentSale,
    info,
  } = useSales();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (action === "create") {
      createNewSale({
        idClient: values.idClient,
        dateDetail: values.dateDetail.format("YYYY-MM-DD HH:mm:ss"),
      });
      setIsModalOpen(false);
      form.resetFields();
      console.log(":D");
    }

    if (action === "delete" && idDetail) {
      deleteOneSale(idDetail);
    }

    if (action === "update" && currentSale?.idDetail) {
      updateOneSale({
        ...currentSale,
        idDetail: currentSale.idDetail,
        idClient: values.idClient,
        dateDetail: values.dateDetail.format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  };

  useEffect(() => {
    if (action === "update" && currentSale) {
      form.setFieldsValue({
        idClient: currentSale.infoClient.idClient,
        client: currentSale.infoClient.nameClient,
        dateDetail: dayjs(currentSale.dateDetail),
      });
    }
  }, [action, currentSale, form]);

  useEffect(() => {
    if (action === "update" && isModalOpen && idDetail) {
      getOneSale(idDetail);
    }
  }, [action, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      clearDataCurrentSale();
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
        title={text}
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
              <Form.Item name="idClient" hidden>
                <Input />
              </Form.Item>

              <div className="flex flex-row gap-20">
                <Form.Item
                  label="Cliente"
                  name="client"
                  rules={[{ required: true }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nombre cliente" readOnly disabled />
                </Form.Item>
                <ClientList form={form} />
              </div>

              <>
                <Form.Item
                  label="Fecha"
                  name="dateDetail"
                  rules={[{ required: true }]}
                >
                  <DatePicker showTime />
                </Form.Item>
              </>
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
export default SalesButtonModal;

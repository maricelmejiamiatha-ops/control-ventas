"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import { useItems } from "../hooks/useDetailSales";
import TextArea from "antd/es/input/TextArea";
import {
  DeleteOutlined,
  FolderAddOutlined,
  FormOutlined,
} from "@ant-design/icons";

type IItemForm = {
  text: string;
  action: string;
  idDetail: number;
  idListDetail?: number;
};

function ItemButtonModal({ text, action, idDetail, idListDetail }: IItemForm) {
  const {
    getOneItem,
    clearDataCurrentItem,
    createNewItem,
    updateOneItem,
    deleteOneItem,
    getTotalPrice,
    currentItem,
  } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    if (action === "update" && idListDetail) {
      getOneItem(+idDetail, +idListDetail);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    if ((action === "delete" || action === "update") && idListDetail) {
      clearDataCurrentItem();
    }
  };

  const onFinish = (values: any) => {
    if (action === "create") {
      createNewItem({ idDetail, idListDetail, ...values });
      setIsModalOpen(false);
      form.resetFields();
    }

    if (action === "update") {
      updateOneItem({ idDetail, idListDetail, ...values });
    }

    if (action === "delete" && idListDetail) {
      deleteOneItem(idDetail, +idListDetail);
    }
  };

  useEffect(() => {
    if (isModalOpen && action === "update" && currentItem) {
      form.setFieldsValue({
        codeService: currentItem.codeService,
        amount: currentItem.amount,
        unitMeasurement: currentItem.unitMeasurement,
        descriptionDetail: currentItem.descriptionDetail,
        unitPrice: currentItem.unitPrice,
        discount: currentItem.discount,
      });
    }
  }, [action, currentItem, form]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <FolderAddOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>
      <Modal
        title={`${text} Item`}
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
                label="Codigo de servicio"
                name="codeService"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Cantidad"
                name="amount"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Unidad de medida"
                name="unitMeasurement"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Descripcion"
                name="descriptionDetail"
                rules={[{ required: true }]}
              >
                <TextArea showCount maxLength={512} placeholder="can resize" />
              </Form.Item>

              <Form.Item
                label="Precio Unitario"
                name="unitPrice"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  precision={2}
                />
              </Form.Item>

              <Form.Item
                label="Descuento"
                name="discount"
                rules={[{ required: true }]}
              >
                <Input type="number" />
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

export default ItemButtonModal;

"use client";
import React, { useEffect } from "react";
import { Button } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { FilePdfOutlined } from "@ant-design/icons";
import print2 from "@/app/images/icons/print2.svg";
import SCImage from "@/app/shared/components/SCImage";
import { numberToSpanishWords } from "@/app/helpers/pdf.helper";
import { useItems } from "../hooks/useDetailSales";

const baseUrl =
  process.env.NEXT_PUBLIC_AROUND_DEVELOP === "production"
    ? process.env.NEXT_PUBLIC_URL_SERVER_PRODUCTION
    : process.env.NEXT_PUBLIC_URL_SERVER_DEVELOP;

function PDFButton({
  idDetail,
  items,
  subTotal,
  userInfo,
  render,
  date,
  cufCode,
  clientInfo,
}: any) {
  const { getTotalPrice } = useItems();

  useEffect(() => {
    getTotalPrice(idDetail);
  }, [getTotalPrice, idDetail]);

  const handleGeneratePDF = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    const leftWidth = 80;
    const centerX = leftWidth / 2;

    // HEADER
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(userInfo.fullNameUser.toUpperCase(), centerX, 14, {
      align: "center",
    });

    pdf.setFontSize(8);
    pdf.text("CASA MATRIZ", centerX, 20, {
      align: "center",
    });

    pdf.setFont("helvetica", "normal");
    pdf.text(`Sucursal No. ${userInfo.numberSucursal}`, centerX, 24, {
      align: "center",
    });

    pdf.text(`LOCALIDAD: ${userInfo.locality}`, centerX, 28, {
      align: "center",
    });

    pdf.text(
      `NRO.: ${userInfo.numberLocality}, TELEFONO: ${userInfo.numberPhoneUser}`,
      centerX,
      32,
      {
        align: "center",
      },
    );

    pdf.text(`${userInfo.city}`, centerX, 36, {
      align: "center",
    });

    pdf.setFont("helvetica", "bold");
    pdf.text(`NIT:`, 140, 14);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${userInfo.nitUser}`, 175, 14);

    pdf.setFont("helvetica", "bold");
    pdf.text(`FACTURA N°:`, 140, 18);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${idDetail}`, 175, 18);

    pdf.setFont("helvetica", "bold");
    pdf.text(`COD. AUTORIZACIÓN:`, 140, 22);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${cufCode}`, 175, 22, { maxWidth: 30 });

    const pageWidth = pdf.internal.pageSize.getWidth();

    // TITULO
    pdf.setFontSize(14);

    pdf.setFont("helvetica", "bold");
    pdf.text("FACTURA", pageWidth / 2, 45, { align: "center" });

    pdf.setFontSize(9);

    pdf.setFont("helvetica", "normal");
    pdf.text("(Con Derecho a Crédito Fiscal)", pageWidth / 2, 50, {
      align: "center",
    });

    // CLIENTE
    pdf.setFontSize(8);

    pdf.setFont("helvetica", "bold");
    pdf.text("Fecha:", 10, 60);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${date.toUpperCase()}`, 48, 60);

    pdf.setFont("helvetica", "bold");
    pdf.text("Nombre/Razón Social:", 10, 65);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${clientInfo.nameClient.toUpperCase()}`, 48, 65);

    pdf.setFont("helvetica", "bold");
    pdf.text("NIT/CI/CEX:", 150, 60);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${clientInfo.ciClient}`, 175, 60);

    pdf.setFont("helvetica", "bold");
    pdf.text("Cod. Cliente:", 150, 65);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${clientInfo.ciClient}`, 175, 65);

    // TABLA PRINCIPAL + TOTALES (MISMA TABLA)
    autoTable(pdf, {
      startY: 70,
      theme: "grid",
      margin: { left: 10 },

      styles: {
        fontSize: 7.5,
        halign: "center",
        lineWidth: 0.4,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },

      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        lineWidth: 0.4,
        halign: "center",
        valign: "middle",
        minCellHeight: 12,
      },

      bodyStyles: {
        halign: "left",
      },

      didParseCell: (data: any) => {
        if (
          data.section === "body" &&
          [1, 4, 5, 6].includes(data.column.index)
        ) {
          data.cell.styles.halign = "right";
        }
      },

      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 50 },
        4: { cellWidth: 28 },
        5: { cellWidth: 28 },
        6: { cellWidth: 28 },
      },

      head: [
        [
          "CÓDIGO PRODUCTO /SERVICIO",
          "CANTIDAD",
          "UNIDAD DE MEDIDA",
          "DESCRIPCIÓN",
          "PRECIO UNITARIO",
          "DESCUENTO",
          "SUBTOTAL",
        ],
      ],

      body: [
        ...items.map((item: any) => {
          const subtotal = item.amount * item.unitPrice - item.discount;

          return [
            item.codeService,
            item.amount,
            item.unitMeasurement,
            item.descriptionDetail,
            item.unitPrice.toFixed(2),
            item.discount.toFixed(2),
            subtotal.toFixed(2),
          ];
        }),

        [
          { content: "", colSpan: 4, styles: { lineWidth: { top: 0.4 } } },
          { content: "SUBTOTAL Bs", colSpan: 2, styles: { halign: "right" } },
          subTotal.toFixed(2),
        ],

        [
          { content: "", colSpan: 4, styles: { lineWidth: 0 } },
          {
            content: "DESCUENTO Bs",
            colSpan: 2,
            styles: { halign: "right", fontStyle: "normal" },
          },
          "0.00",
        ],

        [
          { content: "", colSpan: 4, styles: { lineWidth: 0 } },
          {
            content: "TOTAL Bs",
            colSpan: 2,
            styles: { halign: "right", fontStyle: "bold" },
          },
          subTotal.toFixed(2),
        ],

        [
          {
            content: `Son: ${numberToSpanishWords(subTotal)} Bolivianos`,
            colSpan: 3,
            styles: { lineWidth: 0, fontStyle: "normal" },
          },
          { content: "", colSpan: 1, styles: { lineWidth: 0 } },
          {
            content: "MONTO GIFT CARD Bs",
            colSpan: 2,
            styles: { halign: "right", fontStyle: "bold" },
          },
          "0.00",
        ],

        [
          { content: "", colSpan: 4, styles: { lineWidth: 0 } },
          {
            content: "MONTO A PAGAR Bs",
            colSpan: 2,
            styles: { halign: "right", fontStyle: "bold" },
          },
          subTotal.toFixed(2),
        ],

        [
          { content: "", colSpan: 4, styles: { lineWidth: 0 } },
          {
            content: "IMPORTE BASE CRÉDITO FISCAL Bs",
            colSpan: 2,
            styles: { halign: "right", fontStyle: "bold" },
          },
          subTotal.toFixed(2),
        ],
      ],
    });

    const y = (pdf as any).lastAutoTable.finalY;
    const strLink = `nit=${userInfo.nitUser}&cuf=${cufCode}`;
    const qr = await QRCode.toDataURL(
      `${baseUrl}/consulta?${strLink}&numero=${idDetail}&t=2`,
    );

    pdf.addImage(qr, "PNG", 170, y + 5, 40, 40);

    pdf.setFontSize(7);

    pdf.text(
      "ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS, EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE ACUERDO A LEY",
      10,
      y + 15,
      { maxWidth: 160 },
    );

    pdf.text(
      "Ley N° 453: Puedes acceder a la reclamación cuando tus derechos han sido vulnerados.",
      35,
      y + 20,
      { maxWidth: 160 },
    );

    pdf.text(
      `“Este documento es la Representación Gráfica de un Documento Fiscal Digital emitido en una modalidad de facturación en línea”`,
      15,
      y + 25,
      { maxWidth: 160 },
    );

    pdf.save(`factura-${idDetail}.pdf`);
  };

  return render === "qr" ? (
    <>
      <button
        className="block w-full px-3 py-2 text-left hover:bg-gray-100 cursor-pointer"
        onClick={handleGeneratePDF}
      >
        <div className="flex items-center">
          <SCImage item={print2} alt="print2 svg" flag="extra_case" />
          <p className="text-[14px] ml-3">MEDIA PAGINA</p>
        </div>
      </button>
    </>
  ) : (
    <>
      <Button type="primary" onClick={handleGeneratePDF}>
        <FilePdfOutlined />
      </Button>
    </>
  );
}

export default PDFButton;

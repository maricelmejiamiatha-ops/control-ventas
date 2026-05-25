"use client";
import React from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import print1 from "@/app/images/icons/print1.svg";
import SCImage from "@/app/shared/components/SCImage";
import { numberToSpanishWords } from "@/app/helpers/pdf.helper";

const baseUrl =
  process.env.NEXT_PUBLIC_AROUND_DEVELOP === "production"
    ? process.env.NEXT_PUBLIC_URL_SERVER_PRODUCTION
    : process.env.NEXT_PUBLIC_URL_SERVER_DEVELOP;

function PDFButton8M({
  idDetail,
  items,
  total,
  userInfo,
  clientInfo,
  date,
  cufCode,
}: any) {
  const handleGeneratePDF = async () => {
    let y = 110;

    items.forEach(() => {
      y += 12;
    });

    y += 130;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, y],
    });

    // HEADER
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text("FACTURA", 40, 14, { align: "center" });
    pdf.text("CON DERECHO A CRÉDITO FISCAL", 40, 18, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.text(`${userInfo.fullNameUser.toUpperCase()}`, 40, 22, {
      align: "center",
    });
    pdf.text(`Sucursal No. ${userInfo.numberSucursal}`, 40, 26, {
      align: "center",
    });
    pdf.text(`LOCALIDAD: ${userInfo.locality}`, 40, 30, { align: "center" });
    pdf.text(`NRO.: ${userInfo.numberLocality}`, 40, 34, {
      align: "center",
    });
    pdf.text(`TELEFONO: ${userInfo.numberPhoneUser}`, 40, 38, {
      align: "center",
    });
    pdf.text("Tel. -", 40, 42, { align: "center" });
    pdf.text(`${userInfo.city}`, 40, 46, { align: "center" });
    pdf.setFontSize(16);
    pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, 50, {
      align: "center",
    });

    // NIT DATA
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("NIT", 40, 54, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.text(`${userInfo.nitUser}`, 40, 58, { align: "center" });
    pdf.setFont("helvetica", "bold");
    pdf.text("FACTURA N°", 40, 62, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.text(`${idDetail}`, 40, 66, { align: "center" });
    pdf.setFont("helvetica", "bold");
    pdf.text("CÓD. AUTORIZACIÓN", 40, 70, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.text(pdf.splitTextToSize(`${cufCode}`, 70), 40, 74, {
      align: "center",
    });
    pdf.setFontSize(16);
    pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, 82, {
      align: "center",
    });
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("NOMBRE/RAZÓN SOCIAL:", 7, 84);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${clientInfo.nameClient}`, 45, 84);

    pdf.setFont("helvetica", "bold");
    pdf.text("NIT/CI/CEX:", 27.1, 88);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${clientInfo.ciClient}`, 45, 88);

    pdf.setFont("helvetica", "bold");
    pdf.text("COD. CLIENTE:", 21.9, 92);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${clientInfo.ciClient}`, 45, 92);

    pdf.setFont("helvetica", "bold");
    pdf.text("FECHA DE EMISIÓN:", 14.7, 96);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${date.toUpperCase()}`, 45, 96);

    pdf.setFontSize(16);
    pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, 100, {
      align: "center",
    });
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("DETALLE", 40, 104, { align: "center" });

    y = 110;

    items.forEach(
      (item: {
        codeService: any;
        descriptionDetail: any;
        amount: any;
        unitPrice: any;
        discount: any;
        subTotal: any;
      }) => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.text(`${item.codeService} - ${item.descriptionDetail}`, 5, y);

        y += 4;

        pdf.setFont("helvetica", "normal");
        pdf.text("Unidad de Medida: Unidad (Bienes)", 6, y);

        y += 4;

        pdf.text(
          `${Number(item.amount).toFixed(2)} X ${Number(item.unitPrice).toFixed(
            2,
          )} - ${Number(item.discount).toFixed(2)}`,
          5,
          y,
        );

        pdf.text(`${Number(item.subTotal).toFixed(2)}`, 74, y, {
          align: "right",
        });

        y += 4;
      },
    );

    pdf.setFontSize(8);
    pdf.text(
      "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
      40,
      y,
      {
        align: "center",
      },
    );

    y += 4;

    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text("SUBTOTAL Bs", 26, y);
    pdf.text(`${Number(total).toFixed(2)}`, 74, y, { align: "right" });

    y += 5;

    pdf.text("DESCUENTO Bs", 23.3, y);
    pdf.text("0.00", 74, y, { align: "right" });

    y += 5;

    pdf.text("TOTAL Bs", 31.8, y);
    pdf.text(`${Number(total).toFixed(2)}`, 74, y, { align: "right" });

    y += 5;

    pdf.text("MONTO GIFT CARD Bs", 14.5, y);
    pdf.text("0.00", 74, y, { align: "right" });

    y += 5;

    pdf.setFillColor(245, 245, 245);
    pdf.rect(5, y - 3, 70, 5, "F");
    pdf.setFont("helvetica", "bold");
    pdf.text("MONTO A PAGAR Bs", 16.4, y);
    pdf.text(`${Number(total).toFixed(2)}`, 74, y, { align: "right" });

    y += 4;

    pdf.setFillColor(245, 245, 245);
    pdf.rect(5, y - 3, 70, 5, "F");
    pdf.setFontSize(6);
    pdf.text("IMPORTE BASE CRÉDITO FISCAL Bs", 7.2, y);
    pdf.setFontSize(8);
    pdf.text(`${Number(total).toFixed(2)}`, 74, y, { align: "right" });

    y += 14;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.text(`Son: ${numberToSpanishWords(total)} Bolivianos`, 5.5, y);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, y + 5, {
      align: "center",
    });

    y += 10;

    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");

    pdf.text("ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,", 40, y, {
      align: "center",
    });

    y += 3;
    pdf.text("EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE", 40, y, {
      align: "center",
    });

    y += 3;
    pdf.text("ACUERDO A LEY", 40, y, { align: "center" });

    y += 6;

    pdf.setFontSize(6);
    pdf.text(
      "Ley N° 453: El proveedor debe brindar atención sin discriminación, con",
      40,
      y,
      {
        align: "center",
      },
    );

    y += 2.5;

    pdf.text(
      "respeto, calidez y cordialidad a los usuarios y consumidores.",
      40,
      y,
      {
        align: "center",
      },
    );

    pdf.setFontSize(7);

    y += 6;

    pdf.text("“Este documento es la Representación Gráfica de un", 40, y, {
      align: "center",
    });

    y += 3;
    pdf.text("Documento Fiscal Digital emitido en una modalidad de", 40, y, {
      align: "center",
    });

    y += 3;
    pdf.text("facturación en línea”", 40, y, { align: "center" });

    const qr = await QRCode.toDataURL(
      `${baseUrl}/consulta?nit=${userInfo.nitUser}&cuf=${cufCode}&numero=${idDetail}&t=2`,
    );

    y += 1;
    pdf.addImage(qr, "PNG", 20, y, 40, 40);

    const valueRandom = crypto.randomUUID().replace(/-/g, "");
    pdf.save(`${valueRandom}.pdf`);
  };

  return (
    <button
      className="block w-full px-3 py-2 text-left hover:bg-gray-100 cursor-pointer"
      onClick={handleGeneratePDF}
    >
      <div className="flex items-center">
        <SCImage item={print1} alt="print1 svg" flag="extra_case" />
        <p className="text-[14px] ml-3">ROLLO</p>
      </div>
    </button>
  );
}

export default PDFButton8M;

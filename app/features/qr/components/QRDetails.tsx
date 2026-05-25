import React from "react";
import paper_svg from "@/app/images/icons/paper-svgrepo-com.svg";
import calendar_svg from "@/app/images/icons/calendar-svgrepo-com.svg";
import qrCode_svg from "@/app/images/icons/qr-detailed-svgrepo-com.svg";
import check_svg from "@/app/images/icons/check-circle-svgrepo-com.svg";
import dolar_svg from "@/app/images/icons/money-svgrepo-com.svg";
import QRInfo from "./QRInfo";

function QRDetails({ idDetail, subTotal, date, cuf }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      <QRInfo icon={paper_svg} label="Número de Factura:" value={idDetail} />
      <QRInfo icon={qrCode_svg} label="CUF:" value={cuf} />
      <QRInfo icon={calendar_svg} label="Fecha Emisión:" value={date} />
      <QRInfo icon={dolar_svg} label="Monto Total:" value={`${subTotal.toFixed(2)} Bs.`} />

      <QRInfo
        icon={check_svg}
        label="Estado de la Factura:"
        value="VALIDA"
        highlight
      />
    </div>
  );
}

export default QRDetails;

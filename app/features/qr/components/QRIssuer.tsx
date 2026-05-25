import React from "react";
import nit_svg from "@/app/images/icons/nit.svg";
import localitation_svg from "@/app/images/icons/localitation.svg";
import razon_svg from "@/app/images/icons/social_razon.svg";
import QRInfo from "./QRInfo";

function QRIssuer({ userInfo }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      <QRInfo
        icon={nit_svg}
        label="NIT Emisor:"
        value={`${userInfo.nitUser}`}
      />
      <QRInfo
        icon={razon_svg}
        label="Razón Social:"
        value={`${userInfo.fullNameUser.toUpperCase()}`}
      />
      <QRInfo
        icon={localitation_svg}
        label="Dirección:"
        value={`LOCALIDAD: ${userInfo.locality}, NRO.: ${userInfo.numberLocality}, TELEFONO: ${userInfo.numberPhoneUser}`}
      />
    </div>
  );
}

export default QRIssuer;

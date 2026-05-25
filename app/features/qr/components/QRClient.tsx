import React from "react";
import user_svg from "@/app/images/icons/user.svg";
import number_document_svg from "@/app/images/icons/number_doc.svg";
import QRInfo from "./QRInfo";

function QRClient({ clientInfo }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      <QRInfo
        icon={user_svg}
        label="Nombre / Razón Social:"
        value={`${clientInfo.nameClient}`}
      />

      <QRInfo
        icon={number_document_svg}
        label="Número Documento:"
        value={`${clientInfo.ciClient}`}
      />
    </div>
  );
}

export default QRClient;

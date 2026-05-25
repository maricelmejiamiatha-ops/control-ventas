import React from "react";
import SCImage from "@/app/shared/components/SCImage";
import Image from "next/image";

function QRInfo({ icon, label, value, highlight }: any) {
  return (
    <div className="flex flex-row items-start">
      {/* ICONO */}
      <div
        className={`rounded-lg p-2 h-9 w-9 flex items-center justify-center shrink-0 ${
          highlight ? "bg-[#ddf7e9]" : "bg-[#e9ecef]"
        }`}
      >
        {value === "VALIDA" ? (
          <Image src={icon} alt={label}/>
        ) : (
          <SCImage item={icon} alt={label} flag="normal" />
        )}
      </div>

      {/* TEXTO */}
      <div className="ml-3 min-w-0">
        <p className="font-medium">{label}</p>

        <p
          className={`${
            highlight
              ? "text-[#29bf12] bg-[#ddf7e9] font-medium rounded-sm px-2 w-fit"
              : "break-all"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default QRInfo;

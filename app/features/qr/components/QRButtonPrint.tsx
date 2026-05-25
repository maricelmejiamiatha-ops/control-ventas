"use client";
import React, { useState } from "react";
import caret_down from "@/app/images/icons/caret_down.svg";
import SCImage from "@/app/shared/components/SCImage";
import PDFButton from "../../sales/components/PDFButton";
import PDFButton8M from "../../sales/components/PDFButton8M";

// PDFButton

function QRButtonPrint({
  idDetail,
  items,
  subTotal,
  userInfo,
  clientInfo,
  date,
  cufCode,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-14 relative flex items-center justify-center">
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="px-5 py-2 h-9 w-auto rounded-md bg-[#19A468] text-white cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <p className="mr-3 text-[14px]">Descargar Factura</p>
            <SCImage item={caret_down} alt="caret down svg" flag="anormality" />
          </div>
        </button>
        {open && (
          <div className="absolute bottom-full mb-0.5 w-45 bg-white rounded-md shadow-md">
            <PDFButton8M
              idDetail={idDetail}
              items={items}
              total={subTotal}
              userInfo={userInfo}
              clientInfo={clientInfo}
              date={date}
              cufCode={cufCode}
            />

            <PDFButton
              idDetail={idDetail}
              items={items}
              subTotal={subTotal}
              userInfo={userInfo}
              render="qr"
              date={date}
              clientInfo={clientInfo}
              cufCode={cufCode}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default QRButtonPrint;

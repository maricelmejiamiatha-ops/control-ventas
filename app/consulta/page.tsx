"use client";
import React, { useEffect } from "react";
import siat_bg from "@/app/images/siat_bg.png";
import i_nacionales from "@/app/images/i_nacionales.png";
import Image from "next/image";
import QRTable from "@/app/features/qr/components/QRTable";
import QRDetails from "@/app/features/qr/components/QRDetails";
import QRIssuer from "@/app/features/qr/components/QRIssuer";
import QRClient from "@/app/features/qr/components/QRClient";
import QRHeader from "@/app/features/qr/components/QRHeader";
import QRButtonPrint from "@/app/features/qr/components/QRButtonPrint";
import QRLine from "@/app/features/qr/components/QRLine";
import QRAlert from "@/app/features/qr/components/QRAlert";
import { useQR } from "@/app/features/qr/hooks/useQr";

interface IParams {
  searchParams: Promise<{
    nit?: string;
    cuf?: string;
    numero?: string;
    t?: string;
  }>;
}

export default function Page({ searchParams }: IParams) {
  const { numero } = React.use(searchParams);
  const idSale = Number(numero);
  const { getQRInfoAll, info, results, clearDataQR } = useQR();

  useEffect(() => {
    if (+idSale) {
      getQRInfoAll(+idSale);
    }

    return () => {
      clearDataQR();
    };
  }, [idSale]);

  const isLoading = !info || !results?.length;

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-12">
      {/* HEADER */}
      <QRHeader />
      <QRAlert trigger />
      {/* CONTENEDOR */}
      <section className="bg-white mt-6 mx-3 md:mx-6 p-3 md:p-6 pb-8 rounded-sm shadow-md text-[#2A354B]">
        {/* LOGOS */}
        <section className="flex justify-between gap-3 md:gap-0 h-auto md:h-20">
          <Image
            src={siat_bg}
            alt="SIAT"
            width={190}
            className="w-18 md:w-auto"
          />
          <Image
            src={i_nacionales}
            alt="IMPUESTOS"
            width={300}
            className="w-44 md:w-auto"
          />
        </section>

        <QRLine type="header" />

        {/* TITULO */}
        <section className="px-2 md:px-5">
          <div className="text-center">
            <p className="text-xl md:text-[30px] font-semibold">
              <span className="block md:inline">VERIFICACIÓN DE FACTURA</span>
              <span className="block md:inline"> ELECTRÓNICA</span>
            </p>
          </div>

          <p className="text-lg md:text-[20px] font-medium mt-2">
            Detalle de la Factura
          </p>

          {/* FACTURA */}
          <QRDetails
            idDetail={idSale}
            subTotal={info.subTotal}
            date={info.date}
            cuf={info.cufCode}
          />
        </section>

        <QRLine />

        {/* EMISOR */}
        <section className="px-2 md:px-5">
          <p className="text-lg md:text-[20px] font-medium">Datos del Emisor</p>
          <QRIssuer userInfo={info.user} />
        </section>

        <QRLine />

        {/* CLIENTE */}
        <section className="px-2 md:px-5">
          <p className="text-lg md:text-[20px] font-medium">
            Datos del Cliente
          </p>
          <QRClient clientInfo={info.client} />
        </section>

        <QRLine />

        {/* TABLA */}
        <QRTable data={results} />

        {/* BOTÓN */}
        <QRButtonPrint
          idDetail={idSale}
          items={results}
          subTotal={info.subTotal}
          userInfo={info.user}
          clientInfo={info.client}
          date={info.date}
          cufCode={info.cufCode}
        />
      </section>
    </div>
  );
}

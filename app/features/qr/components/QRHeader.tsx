import React from "react";
import Image from "next/image";
import siat from "@/app/images/siat.png";
import QRButonMode from "./QRButonMode";

function QRHeader() {
  return (
    <section className="bg-[#002B5E] flex justify-between items-center h-17.5 px-4 md:px-8 text-white sticky top-0 z-50">
      <a
        href="https://www.impuestos.gob.bo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={siat} alt="SIAT" width={112} />
      </a>
      <QRButonMode />
    </section>
  );
}

export default QRHeader;
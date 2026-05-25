"use client";
import React, { useEffect, useState } from "react";
import check_svg from "@/app/images/icons/check.svg";
import Image from "next/image";

type Props = {
  trigger?: boolean;
  title?: string;
  description?: string;
};

function QRAlert({
  trigger = false,
  title = "¡Factura válida!",
  description = "La verificación se completó\nexitosamente",
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="bg-[#00A65A] text-white px-4 py-3 rounded-md shadow-lg min-w-62.5 flex">
        <div className="flex items-center justify-center">
          <Image src={check_svg} alt="check" className="w-8 h-8" />
        </div>
        <div className="">
          <p className="font-semibold">{title}</p>
          <p className="text-sm opacity-90 whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default QRAlert;

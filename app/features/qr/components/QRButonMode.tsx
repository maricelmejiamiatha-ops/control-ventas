import Image from "next/image";
import moon from "@/app/images/icons/moon.svg";
import React from "react";

function QRButonMode() {
  return (
    <div>
      <button type="button">
        <Image src={moon} alt="moon" className="w-5 h-5" />
      </button>
    </div>
  );
}

export default QRButonMode;

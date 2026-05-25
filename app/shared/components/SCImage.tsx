import Image from "next/image";
import React from "react";

function SCImage({ item, alt, flag }: any) {
  return (
    <Image
      src={item}
      alt={alt}
      className={
        flag === "anormality"
          ? "w-4 h-4"
          : flag === "extra_case"
            ? "w-5 h-5 font-bold"
            : "w-6 h-6 font-bold"
      }
      style={{
        opacity: alt === "anormality" ? 0.8 : flag === "extra_case" ? 0.8 : 0.5,
      }}
    />
  );
}

export default SCImage;

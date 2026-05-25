import React from "react";

function QRLine({ type }: { type?: string }) {
  return (
    <hr
      className={
        type === "header"
          ? "md:-mx-6 my-4 border-t-2 border-[#E8EBEE]"
          : "my-4 border-t-2 border-[#E8EBEE]"
      }
    />
  );
}

export default QRLine;
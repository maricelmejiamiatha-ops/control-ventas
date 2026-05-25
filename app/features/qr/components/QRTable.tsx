import React from "react";

function QRTable({ data }: any) {
  return (
    <section className="px-2 md:px-5">
      <p className="text-lg md:text-[20px] font-medium">Detalle de Productos</p>

      <div className="mt-4 p-3 md:p-4 rounded-[10px] shadow-[0_0_6px_rgba(0,0,0,0.15)] overflow-x-auto">
        <table className="w-full min-w-150 border-collapse text-[14px] md:text-[15px]">
          <thead>
            <tr>
              <th className="p-2 text-center">Código</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-center">Cantidad</th>
              <th className="p-2 text-right">Precio Unitario</th>
              <th className="p-2 text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item: any) => (
              <tr key={item.idListDetail} className="border-t">
                <td className="p-2 text-center">{item.codeService}</td>
                <td className="p-2 text-left">{item.descriptionDetail}</td>
                <td className="p-2 text-center">{item.amount}</td>
                <td className="p-2 text-right">{item.unitPrice.toFixed(2)}</td>
                <td className="p-2 text-right">{item.subTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default QRTable;

import type { Metadata } from "next";
import icon_consulta from "@/app/images/icon-impn.svg";

export const metadata: Metadata = {
  title: "Consultas",
  icons: {
    icon: icon_consulta.src,
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
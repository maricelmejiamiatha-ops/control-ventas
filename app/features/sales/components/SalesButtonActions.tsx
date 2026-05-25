import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { FolderViewOutlined } from "@ant-design/icons";

function SalesButtonActions({ Text, idDetail }: any) {
  return (
    <Link href={`/sales/${idDetail}`}>
      <Button color="primary" variant="solid">
        <FolderViewOutlined />
      </Button>
    </Link>
  );
}

export default SalesButtonActions;

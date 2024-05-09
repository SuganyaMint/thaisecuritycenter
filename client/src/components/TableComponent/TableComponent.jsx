import React from "react";
import { Space, Table, Tag } from "antd";

function TableComponent({ data, columns }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1000,
        y: 500,
      }}
    />
  );
}

export default TableComponent;

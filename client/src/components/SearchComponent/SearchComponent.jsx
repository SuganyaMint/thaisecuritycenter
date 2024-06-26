import React, { useState } from "react";
import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <SearchOutlined
        onClick={showModal}
        style={{
          fontSize: "24px",
          color: "white",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default SearchComponent;

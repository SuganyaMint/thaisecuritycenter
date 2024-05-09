import React, { useState } from "react";
import { Button, Modal } from "antd";

function ViewNewsModel({ id }) {
  const [open, setOpen] = useState(false);

  const handleOpenModel = () => {
    setOpen(true);
  };
  return (
    <>
      <Button type="primary" className="btn btn-info" onClick={handleOpenModel}>
        ดูรายละเอียด
      </Button>
      <Modal
        title="รายละเอียด"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div dangerouslySetInnerHTML={{__html: id}}></div>
      </Modal>
    </>
  );
}

export default ViewNewsModel;

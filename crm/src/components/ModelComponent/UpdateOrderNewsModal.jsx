import React, { useState } from "react";
import { Button, Modal, Tag, Form, Select, InputNumber } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

function UpdateOrderNewsModal(props) {
  const id = props.data.id;
  const order = props.data.order;
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
  const checkOrder = (value) => {
    props.allData.map((item) => {
      if (parseInt(item.order) === parseInt(value)) {
        Swal.fire({
          title: "ลำดับซ้ำ !",
          text: "ลำดับนี้มีอยู่แล้ว",
          icon: "error",
          allowOutsideClick: false,
        });
      }
    });
    return Promise.resolve();
  };
  const onFinish = async (values) => {
    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการเปลี่ยน ลำดับ หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.put(ApiRouter.UpdateOrderNews + id, {
          order: values.order,
        });
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "Update ลำดับ สำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsModalOpen(false);
          //set time out
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          Swal.fire({
            title: "Error!",
            text: "เกิดข้อผิดพลาด ไม่สามารถ update ลำดับ ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "ยกเลิกการ update ลำดับ",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Tag
        color="cyan"
        onClick={showModal}
        style={{
          cursor: "pointer",
        }}
      >
        {order}
      </Tag>

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            เปลี่ยนลำดับที่การแสดง
          </h1>

          <Form.Item
            label="ลำดับที่แสดง"
            name="order"
            rules={[
              {
                required: true,
                message: "Please input your status!",
              },
            ]}
          >
            <InputNumber
              defaultValue={order}
              style={{ width: 120 }}
              onChange={(value) => checkOrder(value)}
              min={1}
              max={100}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateOrderNewsModal;

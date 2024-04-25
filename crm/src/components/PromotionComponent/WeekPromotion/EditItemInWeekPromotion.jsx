import React, { useState } from "react";
import { Button, Modal, Form, Input, Space, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";

function EditItemInWeekPromotion(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(props.amount);
  const [item_desc, setItem_desc] = useState(props.item_desc);
  const [item_id, setItem_id] = useState(props.item_id);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    setIsModalOpen(false);
    let data = {
      id: props.id,
      item_desc: item_desc,
      amount: amount,
      item_id: item_id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการแก้ไข Item ใน Week Promotion หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.EditAllItemWeekPromotion, data);
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "แก้ไข Item ใน Week Promotion สำเร็จ",
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
            text: "เกิดข้อผิดพลาด ไม่สามารถแก้ไข Item ใน Week Promotion ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancel!",
          text: "ยกเลิกการแกห้ไข Item ใน Week Promotion",
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
      <Button
        type="primary"
        onClick={showModal}
        //สีเหลือง
        style={{
          backgroundColor: "#F9CE1D",
          borderColor: "#F9CE1D",
          color: "#000000",
        }}
      >
        แก้ไข
      </Button>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          แก้ไข Item ใน Week Promotion
        </h1>

        <Form
          name="basic"
          labelCol={{
            span: 6,
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
          <Form.Item name="item_id" label="ID">
            <Input
              defaultValue={props.item_id}
              onChange={(e) => setItem_id(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="item_desc" label="Description">
            <Input
              defaultValue={props.item_desc}
              onChange={(e) => setItem_desc(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="amount" label="Amount">
            <Input
              defaultValue={props.amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginRight: 10,
              }}
            >
              Submit
            </Button>
            <Button type="primary" danger onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditItemInWeekPromotion;

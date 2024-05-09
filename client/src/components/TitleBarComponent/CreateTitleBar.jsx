import React, { useState } from "react";
import { Button, Modal, InputNumber, Form, Input, Upload, message } from "antd";
import Swal from "sweetalert2";

import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

function CreateTitleBar({ setIsSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      await API.post(ApiRouter.TitleBar, {
        title: values.title,
      }).then((res) => {
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "เพิ่มข้อมูลสำเร็จ",
            icon: "success",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              setIsSubmit(true);
              setIsModalOpen(false);
              form.resetFields();
              setFile(null);
            }
          });
        } else {
          message.error("เพิ่มข้อมูลไม่สำเร็จ");
        }
      });
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
      <Button
        onClick={showModal}
        type="primary"
        style={{
          backgroundColor: "#01567B",
          borderColor: "#01567B",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
        shape="round"
        size="large"
      >
        เพิ่ม Title Bar
      </Button>
      <Modal
        // title="เพิ่ม Slider หน้าเว็บไซต์ Section 2"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          เพิ่ม Title Bar เว็บไซต์
        </p>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
            marginTop: 40,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input placeholder="ใส่ Title Bar" />
          </Form.Item>
   
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 18,
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

export default CreateTitleBar;

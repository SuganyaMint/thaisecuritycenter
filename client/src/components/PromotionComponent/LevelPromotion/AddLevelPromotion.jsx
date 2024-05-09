import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Checkbox,
  Form,
  Input,
  Upload,
  message,
  InputNumber,
  DatePicker,
} from "antd";
import Swal from "sweetalert2";

import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";
const { Dragger } = Upload;

function AddLevelPromotion({ setIsSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
    setExpiry(dateString);
    // console.log(dateString);
  };

  const [form] = Form.useForm();

  const props = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setFile(file);
      return false; // ไม่อัปโหลดไฟล์ทันที
    },
    fileList: file ? [file] : [], // ใช้ fileList แทน value
  };
  const onFinish = async (values) => {
    try {
      if (file === null) {
        message.error("กรุณาเลือกไฟล์");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", values.title);
      formData.append("level", values.level);
      formData.append("expiry", expiry);
      formData.append("amount", values.amount);
      formData.append("discount", values.discount);
      formData.append("status", values.status ? 1 : 0);

      await API.post(ApiRouter.LevelPromotion, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
              setTimeout(() => {
                window.location.reload();
              }, 1000);
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
        เพิ่ม LEVEL PROMOTION
      </Button>
      <Modal
        title="ADD LEVEL PROMOTION"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 900,
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
                message: "กรุณากรอกข้อมูล title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: "กรุณากรอก level",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "กรุณากรอก amount",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "กรุณากรอก discount",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Expiry"
            name="expiry"
            rules={[
              {
                required: true,
                message: "กรุณากรอกจำนวนวันที่จะ expiry",
              },
            ]}
          >
            <DatePicker
              style={{
                width: "100%",
              }}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item
            name="image"
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
            rules={[
              {
                required: true,
                message: "กรุณาเลือกไฟล์",
              },
            ]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                คลิกหรือลากไฟล์ที่นี่เพื่ออัปโหลด
              </p>
              <p className="ant-upload-hint">
                รองรับการอัปโหลดไฟล์เป็นรูปภาพเท่านั้น
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="status"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>เปิดขาย</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddLevelPromotion;

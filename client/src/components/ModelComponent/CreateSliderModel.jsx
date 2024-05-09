import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Checkbox, Form, Input, Upload, message } from "antd";
import Swal from "sweetalert2";

import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

const { Dragger } = Upload;

function CreateSliderModel({ setIsSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [form] = Form.useForm();

  const props = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    fileList: file ? [file] : [],
  };

  const onFinish = async (values) => {
    try {
      if (file === null) {
        message.error("กรุณาเลือกไฟล์");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("status", values.status ? 1 : 0);
      formData.append("linkAction", values.linkAction);

      await API.post(ApiRouter.Slider, formData, {
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
        เพิ่ม Slider
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
          เพิ่ม Slider หน้าเว็บไซต์ Section 2
        </p>
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
            name="image"
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
            rules={[
              {
                required: true,
                message: "Please upload your image!",
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
            name="linkAction"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <p
              style={{
                marginBottom: 0,
              }}
            >
              Link :
            </p>
          </Form.Item>
          <Form.Item
            name="linkAction"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Input placeholder="ใส่ LINK" />
          </Form.Item>

          <Form.Item
            name="status"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>ใช้งาน</Checkbox>
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

export default CreateSliderModel;

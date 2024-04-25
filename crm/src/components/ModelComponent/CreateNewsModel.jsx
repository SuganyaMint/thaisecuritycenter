import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
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
} from "antd";
import Swal from "sweetalert2";

import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

const { Dragger } = Upload;

function CreateNewsModel({ setIsSubmit, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const editorRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImagePicker = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = {
          src: reader.result,
          alt: file.name,
        };

        callback(imageData.src, {
          alt: file.name,
        });
        setSelectedImage(imageData);
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
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
      formData.append("subtitle", values.subtitle);
      formData.append("order", values.order);
      formData.append("status", values.status ? 1 : 0);
      formData.append("description", editorRef.current.getContent());

      await API.post(ApiRouter.NewsEvent, formData, {
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
  const checkOrder = (value) => {
    data.map((item) => {
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
        เพิ่ม News-Event
      </Button>
      <Modal
        title="เพิ่ม Banner"
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
            maxWidth: 1000,
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Sub Title"
            name="subtitle"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ลำดับที่แสดง"
            name="order"
            rules={[
              {
                required: true,
                message: "Please input your order!",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={100}
              style={{
                width: "100%",
              }}
              onChange={(value) => checkOrder(value)}
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Editor
              apiKey="goune2ih3hh5ximl230hx82fc2lc4kufbxx5m0rh31yew1ku"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>รายละเอียดของกิจกรรม</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image | preview media fullscreen | " +
                  "forecolor backcolor emoticons | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                file_picker_types: "image",
                file_picker_callback: handleImagePicker,
              }}
            />
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

export default CreateNewsModel;

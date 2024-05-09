import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Upload, message } from "antd";
import Swal from "sweetalert2";

import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";
const { Dragger } = Upload;


function ChangePicMonthPromotion(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
  
    const [form] = Form.useForm();
    const props2 = {
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
        await API.put(ApiRouter.UpdatePicureLevelMonthPromotion + props.id, formData, {
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
    const [displayedImage, setDisplayedImage] = useState(props.img);
    const handlePictureChange = async () => {
      const new_file = event.target.files[0];
  
      // You can perform any additional logic with the selected file here
  
      // Assuming you want to update the displayed image
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the image data to the state or perform any other action
        setDisplayedImage(e.target.result);
      };
      reader.readAsDataURL(new_file);
    };
  
    return (
      <>
        <img
          src={displayedImage}
          width="100px"
          onClick={showModal}
          style={{
            cursor: "pointer",
          }}
        />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            EDIT PICTURE MONTH PROMOTION
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <img
                src={displayedImage}
                alt="Blob Image"
                style={{
                  width: "150px",
                  height: "150px",
                }}
                onChange={handlePictureChange}
              />
            </div>
            <Form.Item
              name="image"
              wrapperCol={{
                offset: 4,
                span: 18,
              }}
            >
              <Dragger {...props2}>
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
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
}

export default ChangePicMonthPromotion
import React, { useState } from "react";
import { Button, Modal, Tag, Form, Input, InputNumber, Select } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

function EditTitleBar(props) {
  // console.log(props);
  const id = props.data.id;
  const oldStatus = props.data.status;
  const [status, setStatus] = useState(oldStatus);
  const oldTitle = props.data.title;
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

  const onFinish = async (values) => {
    // console.log("Success:", values);

    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการแก้ไข Title Bar หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.put(ApiRouter.TitleBar + id, {
          title: values.title ? values.title : oldTitle,
          status: status
          // status: values.status,
        });
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "แก้ไข Title Bar สำเร็จ",
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
            text: "เกิดข้อผิดพลาด แก้ไข Title Bar ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "ยกเลิกการแก้ไข Title Bar",
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
        onClick={showModal}
        style={{
          cursor: "pointer",
          //สีเหลือง
          backgroundColor: "#FFCC00",
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
          <h1
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            แก้ไข Title Bar
          </h1>

          <Form.Item label="Title" name="title">
            <Input defaultValue={oldTitle} style={{ width: 300 }} />
          </Form.Item>

    

          <Form.Item label="สถานะ" name="status">
            <Select
              onChange={(value) => {
                setStatus(value);
              }}
              defaultValue={oldStatus === 1 ? "ใช้งาน" : "ไม่ใช้งาน"}
              style={{ width: 300 }}
              options={[
                { value: 1, label: "ใช้งาน" },
                { value: 0, label: "ไม่ใช้งาน" },
              ]}
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
export default EditTitleBar;

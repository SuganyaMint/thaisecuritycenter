import React, { useState } from "react";
import { Button, Modal, Select, Form, Input } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

function EditButton(props) {
  const id = props.data.id;
  const text = props.data.text;
  const link = props.data.link;
  const [status, setStatus] = useState(props.data.status);
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
    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการ Update Button หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.put(ApiRouter.Button + id, {
          text: values.text ? values.text : text,
          link: values.link ? values.link : link,
          status: status,
        });
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "Update Button สำเร็จ",
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
            text: "เกิดข้อผิดพลาด ไม่สามารถ Update Button ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "ยกเลิกการ Update Button",
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
          backgroundColor: "#fadb14",
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
            แก้ไข Button
          </h1>

          <Form.Item
            label="Text"
            name="text"
            
          >
            <Input defaultValue={text} style={{ width: 300 }} />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            
          >
            <Input defaultValue={link} style={{ width: 300 }} />
          </Form.Item>
          <Form.Item label="สถานะ" name="status">
            <Select
              onChange={(value) => {
                setStatus(value);
              }}
              defaultValue={status === 1 ? "ใช้งาน" : "ไม่ใช้งาน"}
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
export default EditButton;

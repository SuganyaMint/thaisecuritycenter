import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, Tag } from "antd";
import Swal from "sweetalert2";
import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";

function UpdateStatusWeekPromotion(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(props.status);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    // console.log("Success:", values);
    let data = {
      id: props.id,
      status: values.status,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการเพิ่ม Item ใน Week Promotion หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.UpdateStatusWeekPromotion, data);
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "เพิ่ม Item ใน Week Promotion สำเร็จ",
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
            text: "เกิดข้อผิดพลาด ไม่สามารถเพิ่ม Item ใน Week Promotion ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "ยกเลิกการเพิ่ม Item ใน Week Promotion",
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
      {props.status === 1 ? (
        <Tag color="green" onClick={showModal}>
          กำลังขาย
        </Tag>
      ) : (
        <Tag color="red" onClick={showModal}>
          ไมได้ขาย
        </Tag>
      )}
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
            เปลี่ยนสถานะ
          </h1>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please input your status!",
              },
            ]}
          >
            <Select
              defaultValue={props.status}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 0, label: "ไมได้ขาย" },
                { value: 1, label: "กำลังขาย" },
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

export default UpdateStatusWeekPromotion;
